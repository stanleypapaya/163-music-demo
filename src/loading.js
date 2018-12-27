{
    let view = {
        el: '#siteLoading',
        show(){
            $(this.el).addClass('active')
            $('.page').addClass('active')
        },
        hide(){
            $(this.el).removeClass('active')
            $('.page').removeClass('active')
        }
    }
    let controller = {
        init(view){
            this.view = view
            this.bindEventHub()
        },
        bindEventHub(){
            window.eventHub.on('beforeUpload', ()=>{
                this.view.show()
            })
            window.eventHub.on('afterUpload', ()=>{
                this.view.hide()
            })
        }
    }
    controller.init(view)
}