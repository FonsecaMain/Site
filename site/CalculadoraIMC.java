package com.nutridrei.calculadora;

import java.text.DecimalFormat;

/**
 * Classe CalculadoraIMC
 * Calcula o Índice de Massa Corporal (IMC) e classifica em categorias
 * Otimizada para uso em backend do site NutriDrei
 */
public class CalculadoraIMC {
    
    // Constantes de classificação IMC
    private static final double ABAIXO_PESO = 18.5;
    private static final double PESO_NORMAL = 25.0;
    private static final double SOBREPESO = 30.0;
    private static final double OBESIDADE_I = 35.0;
    private static final double OBESIDADE_II = 40.0;
    
    // Enum para categorias
    public enum CategoriaIMC {
        ABAIXO_DO_PESO("Abaixo do peso", "#3498db"),
        PESO_NORMAL("Peso normal", "#2d8659"),
        SOBREPESO("Sobrepeso", "#f39c12"),
        OBESIDADE_GRAU_I("Obesidade Grau I", "#e67e22"),
        OBESIDADE_GRAU_II("Obesidade Grau II", "#d35400"),
        OBESIDADE_GRAU_III("Obesidade Grau III", "#c0392b");
        
        private String nome;
        private String cor;
        
        CategoriaIMC(String nome, String cor) {
            this.nome = nome;
            this.cor = cor;
        }
        
        public String getNome() {
            return nome;
        }
        
        public String getCor() {
            return cor;
        }
    }
    
    // Classe interna para resultado
    public static class ResultadoIMC {
        private double imc;
        private CategoriaIMC categoria;
        private String mensagem;
        
        public ResultadoIMC(double imc, CategoriaIMC categoria, String mensagem) {
            this.imc = imc;
            this.categoria = categoria;
            this.mensagem = mensagem;
        }
        
        public double getImc() {
            return imc;
        }
        
        public CategoriaIMC getCategoria() {
            return categoria;
        }
        
        public String getMensagem() {
            return mensagem;
        }
        
        @Override
        public String toString() {
            DecimalFormat df = new DecimalFormat("#.##");
            return "IMC: " + df.format(imc) + " | " + categoria.getNome();
        }
    }
    
    /**
     * Calcula o IMC baseado em peso e altura
     * @param peso em quilogramas
     * @param altura em metros
     * @return ResultadoIMC com cálculo e classificação
     * @throws IllegalArgumentException se valores inválidos
     */
    public static ResultadoIMC calcular(double peso, double altura) 
        throws IllegalArgumentException {
        
        // Validação
        if (peso <= 0 || altura <= 0) {
            throw new IllegalArgumentException("Peso e altura devem ser maiores que zero");
        }
        
        if (peso > 500) {
            throw new IllegalArgumentException("Peso inválido! Máximo 500kg");
        }
        
        if (altura < 0.5 || altura > 2.5) {
            throw new IllegalArgumentException("Altura inválida! De 0.5m a 2.5m");
        }
        
        // Fórmula: IMC = peso / (altura²)
        double imc = peso / (altura * altura);
        
        // Classifica a categoria
        CategoriaIMC categoria = classificar(imc);
        
        // Gera mensagem
        String mensagem = gerarMensagem(categoria);
        
        return new ResultadoIMC(imc, categoria, mensagem);
    }
    
    /**
     * Classifica o IMC em categoria
     */
    private static CategoriaIMC classificar(double imc) {
        if (imc < ABAIXO_PESO) {
            return CategoriaIMC.ABAIXO_DO_PESO;
        } else if (imc < PESO_NORMAL) {
            return CategoriaIMC.PESO_NORMAL;
        } else if (imc < SOBREPESO) {
            return CategoriaIMC.SOBREPESO;
        } else if (imc < OBESIDADE_I) {
            return CategoriaIMC.OBESIDADE_GRAU_I;
        } else if (imc < OBESIDADE_II) {
            return CategoriaIMC.OBESIDADE_GRAU_II;
        } else {
            return CategoriaIMC.OBESIDADE_GRAU_III;
        }
    }
    
    /**
     * Gera mensagem de recomendação por categoria
     */
    private static String gerarMensagem(CategoriaIMC categoria) {
        switch (categoria) {
            case ABAIXO_DO_PESO:
                return "Consulte um nutricionista para ganho saudável de peso";
            case PESO_NORMAL:
                return "Continue mantendo seu peso saudável!";
            case SOBREPESO:
                return "Considere uma atividade física regular";
            case OBESIDADE_GRAU_I:
            case OBESIDADE_GRAU_II:
            case OBESIDADE_GRAU_III:
                return "Procure orientação profissional urgentemente";
            default:
                return "Consulte um profissional de saúde";
        }
    }
    
    /**
     * Registra cálculo em log
     */
    public static void registrarLog(double peso, double altura, ResultadoIMC resultado) {
        String log = String.format(
            "[IMC] Peso: %.2f kg | Altura: %.2f m | IMC: %.2f | Categoria: %s",
            peso, altura, resultado.getImc(), resultado.getCategoria().getNome()
        );
        System.out.println(log);
    }
    
    // Main para testes
    public static void main(String[] args) {
        try {
            // Teste 1: Peso normal
            ResultadoIMC r1 = calcular(70, 1.75);
            registrarLog(70, 1.75, r1);
            System.out.println("Mensagem: " + r1.getMensagem());
            System.out.println("Cor: " + r1.getCategoria().getCor() + "\n");
            
            // Teste 2: Sobrepeso
            ResultadoIMC r2 = calcular(85, 1.70);
            registrarLog(85, 1.70, r2);
            System.out.println("Mensagem: " + r2.getMensagem() + "\n");
            
            // Teste 3: Abaixo do peso
            ResultadoIMC r3 = calcular(55, 1.75);
            registrarLog(55, 1.75, r3);
            System.out.println("Mensagem: " + r3.getMensagem() + "\n");
            
        } catch (IllegalArgumentException e) {
            System.err.println("Erro: " + e.getMessage());
        }
    }
}