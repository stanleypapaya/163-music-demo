{
    let view = {
        el: '.newSong',
        template: `
        <h1>新建歌曲</h1>
        `,
        render(data){
            $(this.el).html(this.template)
        }
    }
    let model = {}
    let controller = {
        init(view,model){
            this.view = view
            this.model = model
            this.view.render(this.model.data)
            this.active()
            window.eventHub.on('upload', (data)=>{
                this.active()
            })
            window.eventHub.on('select', (data)=>{
                this.deactive()
            })
            $(this.view.el).on('click', ()=>{
                window.location = 'http://127.0.0.1:8080/src/admin.html'
            })
        },
        active(){
            $(this.view.el).addClass('active')
        },
        deactive(){
            $(this.view.el).removeClass('active')
        }
    }
    controller.init(view,model)
}