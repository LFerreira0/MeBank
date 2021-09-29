import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '@/_models';
import { UserService, AuthenticationService } from '@/_services';
import { AlertService} from '@/_services';

@Component({ 
        templateUrl: 'home.component.html',
        styleUrls: ['home.component.scss']
        })
export class HomeComponent implements OnInit {
    currentUser: User;
    users = [];
    currentDate = new Date();  
    
    constructor(
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private alertService: AlertService
    ) {
        this.currentUser = this.authenticationService.currentUserValue;
    }

    ngOnInit() {
        this.loadAllUsers();     
        
    }

    deleteUser(id: number) {
        this.userService.delete(id)
            .pipe(first())
            .subscribe(() => this.loadAllUsers());
    }

    private loadAllUsers() {
        this.userService.getAll()
            .pipe(first())
            .subscribe(users => this.users = users);
    }

    saldo: number = 100;    
    valorDeposito: number = null;
    depositoAtivo = false;
    guardarAtivo = false;
    valorGuardado: number = null;
    saldoPoupanca: number = 100;
    outroValor = false;
    formaPagamento;
    valorFatura = 1345;
    valorParcial = this.valorFatura * 0.10;
    exibeIcone = true;
    exibeChat = false;
    saldoInsuficiente = false;
    pagamentoAtivo = false;
    valorPagarFatura;
    outroValorPagamento;
    valorInvalido = false;
    semSaldo = false;
    resgatarAtivo = false;
    valorResgate: number = null;
    poupancaInsuficiente = false;
    valorPix: number = null;
    exibeAreaPIX = false;
    valorValido = false;
    habilitaBotao = false;
    exibirEnviar = false;
    valorPixEnviar: number = null;
    destinatarioPix;
    preenchimentoInvalido = false;
    valorPixInvalido = false;
    habilitaChaves = false;
    exibeAba = false;
    atividades: any[] = [];
    atividadesExtrato: any[] = [];   


    deposito(){
        this.depositoAtivo = true;
        this.guardarAtivo = false;
        this.resgatarAtivo = false
        this.saldo = Number(this.saldo) + Number(this.valorDeposito)
        this.saldoInsuficiente = false;
        this.poupancaInsuficiente = false;
        this.habilitaBotao = false;
        this.valorGuardado = 0;
        this.valorResgate = 0;

        if(this.valorDeposito){
            let dadosAtividades = {
                nome: "Deposito em conta corrente",
                valor: this.valorDeposito,
                tipo: "+",
                data: this.currentDate 
            };
        
            this.atividades.unshift(dadosAtividades);  
        }    
    }
  
    guardar(){
        this.saldoInsuficiente = false;
        this.depositoAtivo = false;
        this.resgatarAtivo = false;
        this.guardarAtivo = true;
        this.poupancaInsuficiente = false;
        this.valorDeposito = 0;
        this.valorResgate = 0;
        
        if(this.valorGuardado > this.saldo){
            this.saldoInsuficiente = true;
            return;
        }else{
            this.saldoInsuficiente = false;
        }      
        this.saldoPoupanca = Number(this.saldoPoupanca) + Number(this.valorGuardado);
        this.saldo = Number(this.saldo) - Number(this.valorGuardado);

        if(this.valorGuardado){

            let dadosAtividades = {
                nome: "Aplicação em conta poupança",
                valor: this.valorGuardado,
                tipo: "-",
                data: this.currentDate 
            };
        
            this.atividades.unshift(dadosAtividades); 
        }
    }
    resgatar(){
        this.resgatarAtivo = true;
        this.depositoAtivo = false;
        this.guardarAtivo = false;
        this.saldoInsuficiente = false;
        this.valorDeposito = 0;
        this.valorGuardado = 0;
        
        if(this.valorResgate > this.saldoPoupanca){
            this.poupancaInsuficiente = true;
            return;
        }else{
            this.poupancaInsuficiente = false;
        }

        this.saldoPoupanca = Number(this.saldoPoupanca) - Number(this.valorResgate);
        this.saldo = Number(this.saldo) + Number(this.valorResgate);

        if(this.valorResgate){

        let dadosAtividades = {
            nome: "Resgate em conta poupança",
            valor: this.valorResgate,
            tipo: "+",
            data: this.currentDate 
        };
    
        this.atividades.unshift(dadosAtividades); 
    }
    }

    pagarFatura(){
        if(this.valorFatura == 0){
            this.alertService.error('Pagamento já efetuado!', true);
            setTimeout(()=>{                           //<<<---using ()=> syntax
                this.alertService.clear();
              }, 3000);     
            return;
        }
        this.exibeAreaPIX = false;
        this.habilitaBotao = false;
        this.pagamentoAtivo = true;
        this.exibirEnviar = false;        
    }

    pagamentoTotal(){
        this.outroValor = false; 
    }

    pagamentoParcial(){
        this.outroValor = false; 
    }

    pagamentoOutro(){
        this.outroValor = true;  
    }

    finalizarPagamento(){  
        this.valorInvalido = false;
        this.semSaldo = false;                
        if(this.formaPagamento == 3){
            alert(this.outroValorPagamento)
            if(this.outroValorPagamento < this.valorParcial || !this.outroValorPagamento){                
                this.valorInvalido = true;
                return;
            }
        }
        this.valorPagarFatura = this.formaPagamento == 1 ? this.valorFatura : this.formaPagamento == 2 ? this.valorParcial : this.outroValorPagamento;        
        
        if(this.saldo < this.valorPagarFatura){
            this.semSaldo = true;
            return;
        }

        this.saldo = Number(this.saldo) - Number(this.valorPagarFatura);
        this.valorFatura = 0;
        this.valorParcial = 0;
        this.pagamentoAtivo = false;
        this.alertService.success('Pagamento efetuado com sucesso!', true);
        setTimeout(()=>{                           //<<<---using ()=> syntax
            this.alertService.clear();
          }, 3000); 
          
          let dadosAtividades = {
            nome: "Pagamento fatura meBank",
            valor: this.valorPagarFatura,
            tipo: "-",
            data: this.currentDate 
        };
    
        this.atividades.unshift(dadosAtividades); 


    }

    cancelarPagamento(){
        this.pagamentoAtivo = false;
        this.formaPagamento = undefined;
        this.outroValorPagamento = undefined;
    }
  
    chat(){
        this.exibeIcone = false;
        this.exibeChat = true;
        this.exibeAba = false;
    }

    icone(){
        this.exibeAba = true;
        this.exibeChat = false;
    }

    receber(){        
        this.exibeAreaPIX = true; 
        this.pagamentoAtivo = false;     
        this.exibirEnviar = false;  
        this.valorPixInvalido = false;
        this.habilitaChaves = false;
    }

    validaValor(){        
        if(this.valorPix){            
            this.valorValido = true;
        }
    }

    continuar(){
        this.habilitaBotao = true;
    }

    cancelarPix(){
        this.exibeAreaPIX = false;
        this.habilitaBotao = false;
        this.valorPix = undefined;
    }

    enviar(){
        this.exibirEnviar = true;
        this.exibeAreaPIX = false;
        this.habilitaBotao = false;
        this.valorPix = undefined;
        this.pagamentoAtivo = false;  
    }

    cancelarEnviar(){
        this.exibirEnviar = false;
        this.valorPixInvalido = false;
    }

    enviarPix(){
        this.valorPixInvalido = false;
        if(this.valorPixEnviar > this.saldo){
            this.valorPixInvalido = true;
            return;
        }
        this.alertService.success('Pix enviado com sucesso', true);
        this.saldo = Number(this.saldo) - Number(this.valorPixEnviar);
        this.exibirEnviar = false;  
        
        setTimeout(()=>{                           //<<<---using ()=> syntax
            this.alertService.clear();
          }, 3000);     

          let dadosAtividades = {
            nome: "Pix enviado para " + this.destinatarioPix,
            valor: this.valorPixEnviar,
            tipo: "-",
            data: this.currentDate 
        };
    
        this.atividades.unshift(dadosAtividades); 
          
    }

    chaves(){
        this.exibeAreaPIX = false;
        this.habilitaBotao = false;
        this.habilitaChaves = true;
    }

    fecharChaves(){
        this.habilitaChaves = false;
    } 
}

