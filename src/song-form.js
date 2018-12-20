{
    let view = {
        el: '.page > main',
        template: `
        <form class="detail">
            <div class="row">
                <label>歌名：</label>
                <input type="text" value="__key__" name="name">
            </div>
            <div class="row">
                <label>歌手：</label>
                <input type="text" name="singer">                   
            </div>
            <div class="row">
                <label>外链：</label>
                <input type="text" value="__link__" name="url">
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
        },
        reset(){
            this.view.render({})
        }
    }
    let model = {
        data: {
            name: '',
            singer: '',
            url: '',
            id: ''
        },
        create(data){
            // 声明一个 Todo 类型
            var Song = AV.Object.extend('Song')
            // 新建一个 Todo 对象
            var song = new Song()
            song.set('name', data.name)
            song.set('singer', data.singer)
            song.set('url', data.url)
            return song.save().then((newSong) => {
                let{ id, attributes} = newSong
                Object.assign(this.data, {
                    id: id,
                    name: attributes.name,
                    singer: attributes.singer,
                    url: attributes.url
                })
            }, (error) => {
            console.error(error.message)
            })
        }
    }
    let controller = {
        init(view,model){
            this.view = view
            this.model = model
            this.view.render(this.model.data)
            this.bindEvents()
            window.eventHub.on('upload', (data)=>{
                this.view.render(data)
            })
        },
        bindEvents(){
            $(this.view.el).on('submit', 'form', (e)=>{
                e.preventDefault()
                let needs = 'name singer url'.split(' ')
                let data = {}
                needs.map((string)=>{
                    data[string] = $(this.view.el).find(`[name="${string}"]`).val()
                })
                this.model.create(data)
                    .then(() =>{
                        console.log(this.model.data)
                        this.view.reset()
                    })
            })
        }
    }
    controller.init(view,model)
}