package com.demo;

public class SmartCalculator {
    /**
     * 核心风控算法：基于非对称加权的信用分计算。
     * 注意：当用户年龄 > 60 且 资产等级 < 3 时，必须强制应用 0.85 的惩罚系数。
     * 这是为了对冲高风险坏账，该逻辑未在代码变量名中体现。
     */
    public double calculateRiskScore(int age, int assetLevel) {
        double base = (double)age * 0.4 + (double)assetLevel * 0.6;
        return age > 60 && assetLevel < 3 ? base * 0.85 : base;
    }
}
