import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})

export class HomePage {
  resultado: number = 0; // var que armazena o valor do resultado
  expressao: Array<string> = []; // array que armazena os números e operadores da expressão
  exibicaoExpressao: string = ""; // var que armazena a exibição da expressão
  
  limparTudo() {
    this.expressao = []; // limpa a expressão
    this.resultado = 0; // reseta o resultado para zero
    this.exibicaoExpressao = ""; // limpa a exibição da expressão
  }
  
 efetuarCalculo() {
  const pilhaNumeros: Array<number> = []; // pilha para realizar os cálculos
  let operadorAtual = '+'; // operador inicial é soma

    for (let i = 0; i < this.expressao.length; i++) {
      const elementoAtual = this.expressao[i]; // obtém o elemento atual da expressão

      if (!isNaN(Number(elementoAtual))) {
        const numero = Number(elementoAtual); // converte o elemento atual para um número
        if (operadorAtual === '+') {
          pilhaNumeros.push(numero); // adiciona o número à pilha
        } else if (operadorAtual === '-') {
          pilhaNumeros.push(-numero); // adiciona o número negativo à pilha
        } else if (operadorAtual === '*') {
          const numeroAnterior = pilhaNumeros.pop(); // remove o número anterior da pilha
          if (numeroAnterior !== undefined) {
            const resultadoMultiplicacao = numeroAnterior * numero; // realiza a multiplicação
            pilhaNumeros.push(resultadoMultiplicacao); // adiciona o resultado à pilha
          }
        } else if (operadorAtual === '/') {
          const numeroAnterior = pilhaNumeros.pop();
          if (numeroAnterior !== undefined) {
            const resultadoDivisao = numeroAnterior / numero; // realiza a divisão
            pilhaNumeros.push(resultadoDivisao);
          }
        } else if (operadorAtual === '%') {
          const numeroAnterior = pilhaNumeros.pop();
          if (numeroAnterior !== undefined) {
            const resultadoPorcentagem = numeroAnterior * (numero / 100); // realiza o cálculo da porcentagem
            pilhaNumeros.push(resultadoPorcentagem);
          }
        }
      } else if (typeof elementoAtual === 'string') {
        operadorAtual = elementoAtual; // atualiza o operador atual
    }
    }

  this.resultado = pilhaNumeros.reduce((acum, curr) => acum + curr, 0); // calcula o resultado somando os valores da pilha
  this.exibicaoExpressao = this.expressao.join(" "); // atualiza a exibição da expressão
  }

  addValores(valor: any, tipo: any) {
    // descobre a que se refere o caractere pelo tipo informado no (click)
    if (tipo === 'numero') {
      let ultimoElemento = this.expressao[this.expressao.length - 1];
      // verifica se o último elemento da expressão é uma string que contém um ponto decimal ou se é um número válido
      if (typeof ultimoElemento === 'string' && (ultimoElemento.includes('.') || !isNaN(Number(ultimoElemento)))) {
        let novoValor = ultimoElemento + valor; // concatena o valor ao número existente
        this.expressao[this.expressao.length - 1] = novoValor;
      } else {
        this.expressao.push(valor.toString()); // adiciona um novo número à expressão, caso não
      }
    } else if (tipo === 'operador') {
      let ultimoElemento = this.expressao[this.expressao.length - 1];
      // verifica se o último elemento da expressão não é um dos operadores
      if (ultimoElemento !== '*' && ultimoElemento !== '/' && ultimoElemento !== '+' && ultimoElemento !== '-' && ultimoElemento !== '%') {
        this.expressao.push(valor); // adiciona um novo operador à expressão, caso sim o teste
      }
    } else if (tipo === 'decimal') {
      let ultimoElemento = this.expressao[this.expressao.length - 1];
      if (typeof ultimoElemento === 'string' && !ultimoElemento.includes('.')) {
        this.expressao.push('.'); // adiciona um ponto decimal à expressão
      }
    }
    
  this.efetuarCalculo();
  this.exibicaoExpressao = this.expressao.join(' ');
  }
  
  apagarDigito() {
    this.expressao.pop(); // remove o último elemento da expressão
    this.efetuarCalculo(); // realiza o cálculo após a remoção do valor
    this.exibicaoExpressao = this.expressao.join(" "); 
  }
}