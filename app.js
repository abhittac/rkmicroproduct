   document.getElementById('signOut').addEventListener("click",(e)=>{
        e.preventDefault()
        firebase.auth().signOut().then(cred=>{
             alert("Log Out Successfully")
        })
   })
   firebase.auth().onAuthStateChanged((user)=>{
         if(user!=null){
          document.getElementById('mainPage').style.display="block"
          document.getElementById('form').style.display="none"
            firebase.firestore().collection('item').get().then((snapshot)=>{
                 document.getElementById('row').innerHTML=""
                 
                snapshot.docs.forEach(element => {
                
                
                    document.getElementById('row').innerHTML+=
                    `<tr>
                    <td>${element.data().date}</td>
                    <td>${element.data().id}</td>
                    <td>${element.data().product}</td>
                    <td>${element.data().demand}</td>
                    <td>${element.data().del}</td>
                    <td>${element.data().rem}</td>
                    <td>${element.data().price}</td>
                    <td><button class="${element.id}" id="update">Update</button></td>
                    </tr>`
                });
             }).then(()=>{
                 
                      document.getElementById('row').addEventListener('click',(e)=>{
            
                         var a=  document.querySelector("."+e.target.className).parentElement.previousElementSibling.previousElementSibling.previousElementSibling
                         a.setAttribute('contenteditable','true')
                         
                      })
            }).then(()=>{
            
            
            
                 
                 document.getElementById('row').addEventListener('dblclick',(e)=>{
                      var del=  document.querySelector("."+e.target.className).parentElement.previousElementSibling.previousElementSibling.previousElementSibling
                      var rem=document.querySelector("."+e.target.className).parentElement.previousElementSibling.previousElementSibling
                      console.log(del,rem)
                      const val=del.innerHTML
                      const val1=rem.innerHTML
                      const val2=val1-val
                        firebase.firestore().collection('item').doc(e.target.className).update({
                             del:val,
                             rem:val2
                        }).then(()=>{
                             if(val2==0)
                             {
                                  firebase.firestore().collection('item').doc(e.target.className).delete()
                             }
                        })
                   })
            })
             
            
            document.querySelector('#add').addEventListener('click',(e)=>{
                const db= firebase.firestore()
                const dateNumber=new Date().getDate()
                const monthNumber=new Date().getMonth()
                const yearNumber=new Date().getFullYear()
                 const fullDate=`${dateNumber}/${monthNumber}/${yearNumber}`
                const id=document.getElementById('clientId').value;
                const pro=document.getElementById('product').value;
                const dem=document.getElementById('reqDemand').value;
               const del=document.getElementById('delevered').value;
               const rem=dem-del
            
               var price;
               if(pro.includes('1')){
                    price=del*160
               }
               if(pro.includes('2')){
                 price=del*30
            }
            if(pro.includes('3')){
                 price=del*14
            }
            if(pro.includes('4'))
            {
                 price=del*120
            }
            if(pro.includes('5'))
            {
                 price=del*55
            }
            if(pro.includes('6'))
            {
                 price=del*50
            }
            if(pro.includes('7'))
            {
                 price=del*40
            }
            
            db.collection('item').add({
                id:id,
                product:pro.slice(0,-2),
                demand:dem,
                del:del,
                rem:rem,
                price:price,
                date:fullDate
            
            }).then((cred)=>{
                console.log("added")
            
            
            }).then(()=>{
            
            
            
                firebase.firestore().collection('item').get().then((snapshot)=>{
                     document.getElementById('row').innerHTML=""
                    snapshot.docs.forEach(element => {
                       
                        document.getElementById('row').innerHTML+=
                        `<tr>
                        <td>${element.data().date}</td>
                        <td>${element.data().id}</td>
                        <td>${element.data().product}</td>
                        <td>${element.data().demand}</td>
                        <td>${element.data().del}</td>
                        <td>${element.data().rem}</td>
                        <td>${element.data().price}</td>
                        <td><button id="update" class="${element.id}">Update</button></td>
                        </tr>`
                    });
                 })
                
            
            
            
            })
            
            
             
            
            })
            
            
         }
         else{
          document.getElementById('mainPage').style.display="none"
          document.getElementById('form').style.display="block" 
         }
    })
    
    document.getElementById('btn').addEventListener("click",(e)=>{
          e.preventDefault()
          var email=document.getElementById('uname').value
          var password=document.getElementById("pwd").value
        console.log(email,password)
          firebase.auth().signInWithEmailAndPassword(email,password).then((cred)=>{
          console.log("successfully Login")
     }).then(cred=>{

                  document.getElementById('mainPage').style.display="block"
        document.getElementById('form').style.display="none"
          firebase.firestore().collection('item').get().then((snapshot)=>{
               document.getElementById('row').innerHTML=""
               
              snapshot.docs.forEach(element => {
              
              
                  document.getElementById('row').innerHTML+=
                  `<tr>
                  <td>${element.data().date}</td>
                  <td>${element.data().id}</td>
                  <td>${element.data().product}</td>
                  <td>${element.data().demand}</td>
                  <td>${element.data().del}</td>
                  <td>${element.data().rem}</td>
                  <td>${element.data().price}</td>
                  <td><button class="${element.id}" id="update">Update</button></td>
                  </tr>`
              });
           }).then(()=>{
               
                    document.getElementById('row').addEventListener('click',(e)=>{
          
                       var a=  document.querySelector("."+e.target.className).parentElement.previousElementSibling.previousElementSibling.previousElementSibling
                       a.setAttribute('contenteditable','true')
                       
                    })
          }).then(()=>{
          
          
          
               
               document.getElementById('row').addEventListener('dblclick',(e)=>{
                    var del=  document.querySelector("."+e.target.className).parentElement.previousElementSibling.previousElementSibling.previousElementSibling
                    var rem=document.querySelector("."+e.target.className).parentElement.previousElementSibling.previousElementSibling
                    console.log(del,rem)
                    const val=del.innerHTML
                    const val1=rem.innerHTML
                    const val2=val1-val
                      firebase.firestore().collection('item').doc(e.target.className).update({
                           del:val,
                           rem:val2
                      }).then(()=>{
                           if(val2==0)
                           {
                                firebase.firestore().collection('item').doc(e.target.className).delete()
                           }
                      })
                 })
          })
           
          
          document.querySelector('#add').addEventListener('click',(e)=>{
              const db= firebase.firestore()
              const dateNumber=new Date().getDate()
              const monthNumber=new Date().getMonth()
              const yearNumber=new Date().getFullYear()
               const fullDate=`${dateNumber}/${monthNumber}/${yearNumber}`
              const id=document.getElementById('clientId').value;
              const pro=document.getElementById('product').value;
              const dem=document.getElementById('reqDemand').value;
             const del=document.getElementById('delevered').value;
             const rem=dem-del
          
             var price;
             if(pro.includes('1')){
                  price=del*160
             }
             if(pro.includes('2')){
               price=del*30
          }
          if(pro.includes('3')){
               price=del*14
          }
          if(pro.includes('4'))
          {
               price=del*120
          }
          if(pro.includes('5'))
          {
               price=del*55
          }
          if(pro.includes('6'))
          {
               price=del*50
          }
          if(pro.includes('7'))
          {
               price=del*40
          }
          
          db.collection('item').add({
              id:id,
              product:pro.slice(0,-2),
              demand:dem,
              del:del,
              rem:rem,
              price:price,
              date:fullDate
          
          }).then((cred)=>{
              console.log("added")
          
          
          }).then(()=>{
          
          
          
              firebase.firestore().collection('item').get().then((snapshot)=>{
                   document.getElementById('row').innerHTML=""
                  snapshot.docs.forEach(element => {
                     
                      document.getElementById('row').innerHTML+=
                      `<tr>
                      <td>${element.data().date}</td>
                      <td>${element.data().id}</td>
                      <td>${element.data().product}</td>
                      <td>${element.data().demand}</td>
                      <td>${element.data().del}</td>
                      <td>${element.data().rem}</td>
                      <td>${element.data().price}</td>
                      <td><button id="update" class="${element.id}">Update</button></td>
                      </tr>`
                  });
               })
              
          
          
          
          })
          
          
           
          
          })
          
          

     })
     })
   
   