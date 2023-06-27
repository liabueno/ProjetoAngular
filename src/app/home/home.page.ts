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
  expressao: Array<any> = []; // array que armazena os números e operadores da expressão
  exibicaoExpressao: string = ""; // var que armazena a exibição da expressão
  
  limparTudo() {
    this.expressao = []; // limpa a expressão
    this.resultado = 0; // reseta o resultado para zero
    this.exibicaoExpressao = ""; // limpa a exibição da expressão
  }
  
  efetuarCalculo() {
    const guardaNumeros: Array<number> = []; 
    let operadorAtual = '+'; // inicia o operador com a "soma" 
    
    for (let i = 0; i < this.expressao.length; i++) { // leitura de todos os valores usados no cálculo
      const elementoAtual = this.expressao[i];
  
      if (!isNaN(Number(elementoAtual))) { // verifica se é NaN ou não
        const numero = Number(elementoAtual);
        if (operadorAtual === '+') {
          guardaNumeros.push(numero); // adiciona valor, no positivo
        } else if (operadorAtual === '-') {
          guardaNumeros.push(-numero); // adiciona valor no negativo, subtraindo
        } else if (operadorAtual === '*') {
          const numeroAnterior = guardaNumeros.pop(); // remove o último elemento da expressão
          if (numeroAnterior !== undefined) { // verifica se não é um valor indefinido
            const resultadoMultiplicacao = numeroAnterior * numero; // realiza a multiplicação
            guardaNumeros.push(resultadoMultiplicacao); // adiciona o resultado ao array
          }
        } else if (operadorAtual === '/') {
          const numeroAnterior = guardaNumeros.pop();
          if (numeroAnterior !== undefined) {
            const resultadoDivisao = numeroAnterior / numero; // realiza a divisão
            guardaNumeros.push(resultadoDivisao);
          }
        }
      } else {
        operadorAtual = elementoAtual; // atualiza o operador atual
      }
    }
  
    let resultado = 0;
    if (guardaNumeros.length > 0) { // se o tamanho do array for maior que zero
      resultado = guardaNumeros.reduce((acum, curr) => acum + curr); // calcula a soma dos elementos na var numeros e armazena o resultado nessa var
    }
  
    this.resultado = resultado; // armazena o resultado
    this.exibicaoExpressao = this.expressao.join(" "); // atualiza a exibição da expressão, com espaço
  }
  
  addValores(valor: any, tipo: any) {
    // descobre a que se refere o caractere pelo tipo informado no (click)
    if (tipo === 'numero') {
      let elementoFinal = this.expressao[this.expressao.length - 1]; // seleciona o último valor do array
      // verifica se o último elemento da expressão é uma string que contém um ponto decimal ou se é um número válido
      if (typeof elementoFinal === 'string' && (elementoFinal.includes('.') || !isNaN(Number(elementoFinal)))) { // verifica se a var elementoFinal possui ponto (vírgula)
        let novoValor = elementoFinal + valor; // concatena o valor ao número existente
        this.expressao[this.expressao.length - 1] = novoValor;
      } else {
        this.expressao.push(valor.toString()); // adiciona um novo número à expressão, caso não. força ser string o valor
      }
    } else if (tipo === 'operador') {
      let elementoFinal = this.expressao[this.expressao.length - 1];
      // verifica se o último elemento da expressão não é um dos operadores
      if (elementoFinal !== '*' && elementoFinal !== '/' && elementoFinal !== '+' && elementoFinal !== '-' && elementoFinal !== '%') {
        this.expressao.push(valor); // adiciona um novo operador à expressão, caso sim o teste
      }
    } else if (tipo === 'decimal') {
      let elementoFinal = this.expressao[this.expressao.length - 1];
      if (typeof elementoFinal === 'string' && !elementoFinal.includes('.')) { // typeof confere e retorna o tipo do caractere
        this.expressao.push('.'); // adiciona um ponto decimal à expressão
      } 
    }
    else if (tipo === 'porcentagem'){
      let elementoFinal = this.expressao[this.expressao.length - 1];
      let novoElementoFinal = elementoFinal/100; // realiza a porcentagem
      this.expressao.pop(); 
      this.expressao.push(novoElementoFinal);
    }
      this.efetuarCalculo();
      this.exibicaoExpressao = this.expressao.join(" ");
    }
  
  apagarDigito() {
    this.expressao.pop(); 
    this.efetuarCalculo(); // realiza o cálculo após a remoção do valor
    this.exibicaoExpressao = this.expressao.join(" "); 
  }

}








// obs:  não precisa colocar o zero ao dividir numeros inteiros por decimais, onde o decimal começa com 0 como em: 2 / .8
// deixei o zero subentendido nesse caso