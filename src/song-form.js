{
    let view = {
        el: '.page > main',
        template: `
        <form class="detail">
            <div class="row">
                <label>歌名：</label>
                <input type="text" value="__key__">
            </div>
            <div class="row">
                <label>歌手：</label>
                <input type="text">                   
            </div>
            <div class="row">
                <label>外链：</label>
                <input type="text" value="__link__">
            </div>
            <div class="row">
                <button type="submit">保存</button>
            </div>
        </form>
        `,
        render(data = {}){
            let placeholder = ['key', 'link']
            let html = this.template
            placeholder.map((string)=>{
                html = html.replace(`__${string}__`, data[string] || '')
            })
            $(this.el).html(html)
        }
    }
    let model = {}
    let controller = {
        init(view,model){
            this.view = view
            this.model = model
            this.view.render(this.model.data)
            window.eventHub.on('upload', (data)=>{
                this.view.render(data)
            })
        }
    }
    controller.init(view,model)
}