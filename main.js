const app = new Vue({
  el:'#app',
  data:{
    newItem:'',
    todos:[],
  },
  watch:{
    todos: {
      handler: function(){
        localStorage.setItem('todos', JSON.stringify(this.todos));
      },
      deep: true
    },
  },
  mounted: function(){
    this.todos = JSON.parse(localStorage.getItem('todos')) || []
  },
  methods:{
    addItem:function(){
      if(this.newItem === ''){
        return
      };
      if(this.newItem.length > 15){
        alert('15文字以内で入力してください')
        this.newItem = this.newItem.substring(0, 15)
        return
      }
      let todo = {
        item: this.newItem,
        date: new Date().getFullYear() + "/" +  (new Date().getMonth() + 1 )+ "/"+ new Date().getDate(),
        limit:"",
        isDone:false,
        comment:'',
        count:0
      }
      
      this.todos.push(todo)
      this.newItem = ''
    },
    done: function(index){
      if(this.todos[index].isDone === false){
        return this.todos[index].count = 10
      } else {
        return this.todos[index].count = 9
      }
    },
    countUp: function(index){
      if(this.todos[index].count === 10){
        return
      }
      if(this.todos[index].count === 9){
        this.todos[index].isDone = true
        this.todos[index].count++
        return
      } 
      this.todos[index].count++
    },
    countDown: function(index){
      if(this.todos[index].count === 0){
        return
      }
      if(this.todos[index].count === 10){
        this.todos[index].isDone = false
        this.todos[index].count--
        return
      }
      this.todos[index].count--
    },
    deleteItem: function(index){
      this.todos.splice(index,1)
    },
    purge:function(){
      if(!confirm('完了済みの予定をすべて削除しますか？')){
        return;
      }
      this.todos = this.remaining
    }
  },
  computed:{
    remaining: function(){
      return this.todos.filter(function(todo){
        return !todo.isDone
      })
    },
    
  }
})