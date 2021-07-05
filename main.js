const app = new Vue({
  el:'#app',
  data:{
    newItem:'',
    filter:'all',
    todos:[],
  },
  watch:{
    todos: {
      handler: function(){
        localStorage.setItem('todos', JSON.stringify(this.todos));
      },
      finishedTodos:function(){
        return this.todos.filter( todo =>{
          if(todo.isDone === true){
            return true
          } else {
            return false
          }
        })
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
        date: new Date().toLocaleString(),
        limit:"",
        isDone:false,
        comment:'',
        count:0
      }
      
      this.todos.push(todo)
      this.newItem = ''
    },
    done: function(index){
      if(this.filter === 'all'){
        if(this.todos[index].isDone === false){
          this.todos[index].count = 10
        } else {
          return this.todos[index].count = 9
        }
      } else if (this.filter === 'finidhed'){
        if(this.finishedTodos[index].isDone === false){
          this.finishedTodos[index].count = 10
        } else {
          return this.finishedTodos[index].count = 9
        }
      }  else if (this.filter === 'unfinidhed'){
        if(this.unfinishedTodos[index].isDone === false){
          this.unfinishedTodos[index].count = 10
        } else {
          return this.unfinishedTodos[index].count = 9
        }
      }
    },
    countUp: function(index){
      if(this.filter === 'all'){
        if(this.todos[index].count === 10){
          return
        }
        if(this.todos[index].count === 9){
          this.todos[index].count++
          this.todos[index].isDone = true
          return
        } 
        this.todos[index].count++
      } else if(this.filter === 'finished'){
        if(this.finishedTodos[index].count === 10){
          return
        }
        if(this.finishedTodos[index].count === 9){
          this.finishedTodos[index].count++
          this.finishedTodos[index].isDone = true
          return
        } 
        this.finishedTodos[index].count++
      } else if(this.filter === 'unfinished'){
        if(this.unfinishedTodos[index].count === 10){
          return
        }
        if(this.unfinishedTodos[index].count === 9){
          this.unfinishedTodos[index].count++
          this.unfinishedTodos[index].isDone = true
          return
        } 
        this.unfinishedTodos[index].count++
      }
    },
    countDown: function(index){
    if(this.filter === 'all'){
       if(this.todos[index].count === 0){
        return
      }
      if(this.todos[index].count === 10){
        this.todos[index].count--
        this.todos[index].isDone = false
        return
      }
      this.todos[index].count--
    } else if (this.filter === 'finished'){
      if(this.finishedTodos[index].count === 0){
        return
      }
      if(this.finishedTodos[index].count === 10){
        this.finishedTodos[index].count--
        this.finishedTodos[index].isDone = false
        return
      }
      this.finishedTodos[index].count--
    } else if (this.filter === 'unfinished'){
      if(this.unfinishedTodos[index].count === 0){
        return
      }
      if(this.unfinishedTodos[index].count === 10){
        this.unfinishedTodos[index].count--
        this.unfinishedTodos[index].isDone = false
        return
      }
      this.unfinishedTodos[index].count--
    }

    },
    deleteItem: function(index){
      this.todos.splice(index,1)
    },
    purge:function(){
      if(!confirm('完了済みの予定をすべて削除しますか？')){
        return;
      }
      this.todos = this.remaining
    },
    sortDateRow:function(){
      this.todos.sort(function(a, b) {
        if(a.date < b.date){
          return -1
        } else {
          return 1
        }
     });
    },
    sortDateReverse:function(){
      this.todos.sort(function(a, b) {
        if(a.date < b.date){
          return 1
        } else {
          return -1
        }
     });
    },
    sortCountRow:function(){
      this.todos.sort(function(a, b) {
        if(a.count < b.count){
          return -1
        } else {
          return 1
        }
     });
    },
    sortCountReverse:function(){
      this.todos.sort(function(a, b) {
        if(a.count < b.count){
          return 1
        } else {
          return -1
        }
     });
    },
    sortLimitRow:function(){
      this.todos.sort(function(a, b) {
        if(a.limit < b.limit){
          return -1
        } else {
          return 1
        }
     });
    },
    sortLimitReverse:function(){
      this.todos.sort(function(a, b) {
        if(a.limit < b.limit){
          return 1
        } else {
          return -1
        }
     });
    },
  },
  computed:{
    remaining: function(){
      return this.todos.filter(function(todo){
        return !todo.isDone
      })
    },
    finishedTodos:function(){
      return this.todos.filter( todo =>{
        if(todo.isDone === true){
          return true
        } else {
          return false
        }
      })
    },
    unfinishedTodos:function(){
      return this.todos.filter( todo =>{
        if(todo.isDone === true){
          return false
        } else {
          return true
        }
      })
    },    
  }
})