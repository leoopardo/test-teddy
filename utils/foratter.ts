function Currency(value: number) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(
        value
            ? `${value}`.split('.')[1]
                ? +`${`${value}`.split('.')[0]}.${`${value}`
                      ?.split('.')[1]
                      ?.substring(0, 2)}` //remove todos as casas decimais depois da segunda
                : value
            : 0
    );
}

export const formatter = {
    Currency
}
