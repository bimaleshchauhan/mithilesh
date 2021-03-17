let data = {
    message: "",
    name:""
  }
  
  document.getElementById("message").innerHTML = data.message;
  document.getElementById("name").innerHTML = data.name;
  
  let methods = {
    changeMessage: function() {
      data.message = document.getElementById("messageInput").value;
      console.log("sdsdf", data)
    },
    changeName: function() {
        data.name = document.getElementById("nameInput").value;
      }

  } 
  
  // reactive property changes it's value.
    let target = null

    class Dep {
    constructor() {
        this.subscribers = []
    }
    depend() {
        // Saves target function into subscribers array
        if (target && !this.subscribers.includes(target)) {
        this.subscribers.push(target);
        }
    }
    notify() {
        // Replays target functions saved in the subscribers array
        this.subscribers.forEach(sub => sub());
    }
    }

    Object.keys(data).forEach(key => {
    let internalValue = data[key]

    // Each property gets a dependency instance
    const dep = new Dep()

    Object.defineProperty(data, key, {
        get() {
        console.log(`Getting value, ${internalValue}`)
        dep.depend() // Saves the target function into the subscribers array
        return internalValue
        },
        set(newVal) {
        console.log(`Setting the internalValue to ${newVal}`)
        internalValue = newVal
        dep.notify() // Reruns saved target functions in the subscribers array
        }
    })
    })
    let computed = {
        renderFunction:function(){
            document.getElementById("message").innerHTML = data.message;  
        },
        renderName:function(){
            document.getElementById("name").innerHTML = data.name;
        }
    }
    let renderFunction = () => {
    // Function that renders HTML code.
    document.getElementById("message").innerHTML = data.message; 
    }
    let renderFunction1 = () => {
        // Function that renders HTML code.
        document.getElementById("name").innerHTML = data.name;
        }



    let watcher = function(func) {
    // Here, a watcher is a function that encapsulates the code 
    // that needs to recorded/watched.
    // PS: It just runs once, because after that, the target code is stored
    // in the subscriber's list of the Dep() instance.
   
    target = func // Then it assigns the function to target
    target() // Run the target functionS
    target = null // Reset target to null
    }

    watcher(computed.renderFunction)
    watcher(computed.renderName)