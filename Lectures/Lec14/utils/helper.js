export function sum(a,b){
return a+b
}

export function print(str){
console.log(str)
}

export function reverseSTR(str){
    return str.split("").reverse().join("")
}


// export default  ეს აექსპორტებს მხოლოდ 1 ფუნქციას
// export ეს ანუ named export აქესპორტებს ბევრს {sum,print}