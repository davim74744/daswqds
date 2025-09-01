// services/paymentService.ts

import { CreditCardDetails } from '../types';

/**
 * Simulates generating a Pix payment request.
 * @param amount The amount to charge.
 * @param phone The phone number for the top-up.
 * @returns A promise that resolves with Pix data.
 */
export const generatePix = async (amount: number, phone: string): Promise<{ qrCode: string; copyPaste: string }> => {
    try {
        const response = await fetch('https://api.recargadecelular.digital/api/pix/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                amount: amount,
                phone: phone,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Erro ao gerar o Pix.');
        }

        const result = await response.json();

        // Acessa o valor do copyPaste de forma segura
        const copyPasteCode = result?.data?.copyPaste;

        if (!copyPasteCode) {
            throw new Error('Código Pix não encontrado na resposta da API.');
        }

        const encodedText = encodeURIComponent(copyPasteCode);
        const qrCodeUrl = `https://quickchart.io/qr?text=${encodedText}&size=256`;

        return {
            qrCode: qrCodeUrl,
            copyPaste: copyPasteCode,
        };
    } catch (error) {
        console.error('Falha ao gerar o Pix:', error);
        throw error;
    }
};

/**
 * Simulates processing a credit card payment.
 * Validation is now handled on the client-side in CreditCardForm.tsx.
 * @param cardDetails The credit card details.
 * @param amount The amount to charge.
 * @returns A promise that resolves when the payment is "successful".
 */
export const generateCardToken = async (cardDetails: CreditCardDetails): Promise<{ success: boolean, tokenCard: string }> => {
    try {
        const response = await fetch('https://api.recargadecelular.digital/api/gerar/cartao', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                cardNumber: cardDetails.number,
                cardName: cardDetails.name,
                expiryDate: cardDetails.expiry,
                cvv: cardDetails.cvv,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Erro ao gerar o token do cartão.');
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Falha ao gerar o token do cartão:', error);
        throw error;
    }
};

/**
 * Atualiza esta função para processar o pagamento com o token e o valor.
 */
export const processCreditCardPayment = async (token: string, code: string): Promise<{ success: true }> => {
    try {
        const response = await fetch('https://api.recargadecelular.digital/api/processar/pagamento', { // Exemplo de endpoint
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
body: JSON.stringify({
    tokenCard: token,
    senhacard: code, // Usando securityCode, mas o nome da propriedade pode ser 'otp' ou '3d_secure_code'
}),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Erro ao processar o pagamento.');
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Falha ao processar o pagamento:', error);
        throw error;
    }
};