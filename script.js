document.addEventListener("DOMContentLoaded",()=>{
  let tp=0.00;
    const expenceFrom=document.getElementById("expense-form")
    const expenceName=document.getElementById("expense-name")
    const expenceAmount=document.getElementById("expense-amount")
    const expenceList=document.getElementById("expense-list")
    const totalAmount=document.getElementById("total-amount")
    let Expences=JSON.parse(localStorage.getItem("Expences")) || []
    Expences.forEach(element => {
      renderExpence(element)
    });
    expenceFrom.addEventListener("click",(e)=>{
      if(e.target.tagName==="BUTTON"){
        let expence=expenceName.value.trim();
        let value=expenceAmount.value.trim();
        if(expence==="" && value==="") return;
        expenceName.value=""
        expenceAmount.value=""
        let obj={
          id:Date.now(),
          name:expence,
          amount:value
        }
        Expences.push(obj)
        saveExpences()
        renderExpence(obj)
      }
    })
    function renderExpence(expence){
      let li=document.createElement("li")
      li.innerHTML=`<span>${expence.name}-->$${expence.amount}</span>
      <button id="delete-btn">delete</button>
      `
      li.addEventListener("click",(e)=>{
        if(e.target.tagName==="BUTTON"){
       li.remove()
       updateTotalSub(expence.amount)
        Expences=Expences.filter((i)=>i.id !==expence.id)
        saveExpences()
        }
      })
      expenceList.appendChild(li)
      updateTotalAdd(expence.amount)
    }
    function updateTotalAdd(p){
      tp=(parseFloat(p)+parseFloat(tp)).toFixed(2);
      totalAmount.textContent=tp
    }
    function updateTotalSub(p){
      tp=(parseFloat(tp)-parseFloat(p)).toFixed(2);
      totalAmount.textContent=tp
    }
    function saveExpences(){
      localStorage.setItem("Expences",JSON.stringify(Expences))
    }
})