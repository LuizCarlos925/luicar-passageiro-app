export type ITopUp = {
  payment: Payment;
  imageQrCode: string;
  linkQrCode: string;
} & {
  code: number;
  data: {
    installments: number;
    installment_value: number;
    charge_id: number;
    status: string;
    total: number;
    payment: string;
  };
};

export interface Payment {
  calendario: Calendario;
  txid: string;
  revisao: number;
  status: string;
  valor: Valor;
  chave: string;
  devedor: Devedor;
  solicitacaoPagador: string;
  loc: LOC;
  location: string;
  pixCopiaECola: string;
}

export interface Calendario {
  criacao: string;
  expiracao: number;
}

export interface Devedor {
  cpf: string;
  nome: string;
}

export interface LOC {
  id: number;
  location: string;
  tipoCob: string;
  criacao: Date;
}

export interface Valor {
  original: string;
}
