let cars = [
    {id: 1, title: 'Mitsubishi 3000GT', price: 27000, img: 'https://avatars.mds.yandex.net/get-zen_doc/1863556/pub_5deb550a4e057700b00d9b8f_5deb630f5d636200ad8363ac/scale_1200'},
    {id: 2, title: 'Honda NSX', price: 68000, img: 'https://avatars.mds.yandex.net/i?id=aff786cee908470515d99d56a4aefdb7-4824090-images-thumbs&n=13'},
    {id: 3, title: 'Mitsubishi Eclipse', price: 9650, img: 'https://sun9-8.userapi.com/impg/3GpsiA9vV9TnN2zm7HHSHLOnUsferbDF5zLKjQ/fOK47tJDbVk.jpg?size=604x454&quality=96&sign=7c7aa8a8b8e3946d0f7c16216636e8cf&type=album'},
    {id: 4, title: 'Toyota Supra', price: 68000, img: 'https://avatars.mds.yandex.net/i?id=98e61c768a006b382b84d633f9fae3f7-5599693-images-thumbs&n=13'},
    {id: 5, title: 'Nissan 350z', price: 68000, img: 'https://avatars.mds.yandex.net/i?id=78074cf2f9d030572d747b179c590001-5244093-images-thumbs&n=13'}
]

const toHTML = car => `
        <div class="col" >
            <div class="card" >
                <img class="card-img-top" src="${car.img}" alt="${car.title}">
                <div class="card-body">
                    <h5 class="card-title" style="height: 50px">${car.title}</h5>
                    <a href="#" class="btn btn-primary" data-btn="price" data-id="${car.id}">Посмотреть цену</a>
                    <a href="#" class="btn btn-danger" data-btn="remove" data-id="${car.id}">Удалить</a>
                </div>
            </div>
        </div>
`

function render() {
    const html = cars.map(toHTML).join('')
    document.querySelector('#car').innerHTML = html
}
render()

const priceModal = $.modal({
    title: 'Цена на автомобиль',
    closable: true,
    width: '400px',
    footerButtons: [
        {text: 'Ok', type: 'primary', handler() {
                priceModal.close()
            }}
    ]
})

document.addEventListener('click', event => {
    event.preventDefault()
    const btnType = event.target.dataset.btn
    const id = +event.target.dataset.id
    const car= cars.find(c => c.id === id)


    if (btnType === 'price') {
        priceModal.setContent(`
         <p>Цена на ${car.title} б/у <strong> ${car.price}$  </strong></p>
        `)
        priceModal.open()
    } else if (btnType === 'remove') {
        $.confirm( {
            title: 'Вы уверенты?',
            content: `<p>Вы удаляете <strong> ${car.title}</strong></p>`
        }).then(() => {
        cars = cars.filter(c => c.id !== id)
            render()
        }).catch( () => {
            console.log('Cancel')
        })
    }
})