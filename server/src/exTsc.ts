interface Ad {
    id: string;
    name: string;
    createdAt: Date;
}

function calculaHaQuantoTempoOAnunncioFoiPublicado(ad: Ad) {
    //calculo ha quantos dias foi postado
}

calculaHaQuantoTempoOAnunncioFoiPublicado({
    id: '1',
    name: 'Ad 01',
    createdAt: new Date(),
})