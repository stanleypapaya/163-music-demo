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
            window.eventHub.on('upload', (data)=>{
                this.active()
            })
        },
        active(){
            $(this.view.el).addClass('active')
        }
    }
    controller.init(view,model)
}