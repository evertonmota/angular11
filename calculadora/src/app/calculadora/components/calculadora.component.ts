import { Component, OnInit } from '@angular/core';
import {CalculadoraService} from '../services';

@Component({
  selector: 'app-calculardora',
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.css']
})
export class CalculadoraComponent implements OnInit {

  private numero1 : string;
  private numero2 : string;
  private resultado: number;
  private operacao : string;

  constructor( private calculadoraService : CalculadoraService) { }

  ngOnInit(): void {
    this.clearFields()
  }

  /**
   * Inicia todos os operadores para valores padrão
   * @return void
   */
  clearFields() : void{
      this.numero1 = '0';
      this.numero2 = null;
      this.operacao = null;
      this.resultado = null;
    }
  /**
   *Adiciona o numero selecionado para o calculo posteriormente 
   * @param string numero
   * @param void
   */
  addNumber( numero: string): void {

        if(this.operacao === null ){
          this.numero1 = this.concatenatedNumber( this.numero1 , numero)
        }else{
          this.numero2 = this.concatenatedNumber( this.numero2 , numero)
        }
  }
  /** 
     *Retorna o valor Concatenado. Trata o separador Decimal.
     * 
     * @param string numAtual
     * @param string numConcat
     * @param string 
  */
    concatenatedNumber(pAtual: string, pConcat: string) : string{

      // Caso possua somento '0' ou null, reinicia o valor. 
      if(pAtual === '0' || pAtual === null ){
        pAtual = '';
      }

      // Primeiro digito é '.' concatena '0' antes do ponto.
      if( pConcat === '.' && pAtual === '' ){
        return  '0.';
      }

      //Caso '.' digitado e já contenha um '.' apenas retorna.
      if(pConcat === '.' && pAtual.indexOf('.') > -1){
        return pAtual;
      }

      return pAtual + pConcat;
     }

  /**
      * Executa a logica quando um operador for selecionado.
      * Caso ja possua uma operação selecionada, executa a 
      * operação anterior, e define a nova operação.
      * 
      * @param string operacao
      * @param void
  */
     typeOperation(operacao : string ) : void{
       if(this.operacao === null){
         this.operacao = operacao;
         return;
       }

      /* Caso Operacao definida é o numero 2 selecionado ,
          efetua o calculo da operação.
      */

      if(this.numero2 !== null){
        this.resultado =  this.calculadoraService.calcular(
          parseFloat(this.numero1),
          parseFloat(this.numero2),
          this.operacao);
          this.operacao = operacao;
          this.numero1 = this.resultado.toString();
          this.numero2 = null;
          this.resultado = null;
      }
     }

  /**
      * Efetua o calculo de uma operação
      * @param void
      * 
  */

     calculate() : void {
       if(this.numero2 === null){
        return
       }

       this.resultado = this.calculadoraService.calcular(
         parseFloat(this.numero1),
         parseFloat(this.numero2),
         this.operacao);
     }

  /**
      * Retorna o valor a ser exibido na tela da calculadora
      * 
      * @return string 
      * 
  */
     get display(): string{
       if(this.resultado != null){
         return this.resultado.toString();
       }
       if(this.numero2 != null){
         return this.numero2;
       }
       return this.numero1;
     }

  }



