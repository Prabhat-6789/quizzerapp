
var a=0;
var b=0;
var c=0;
var d=0;
var l=15;
var m=600;
var q=40;
var i=1;
var score=0;
var count=0;
var j;
var temp=0;
let stop;
const question_list=[];
const option_list=[[],[],[],[],[]];
const correct_options=[];
const quiz_data=[];

get_ques();
async function get_ques()
{
    const response= await fetch("https://opentdb.com/api.php?amount=5&category=18&type=multiple");
    var data=await response.json();
    console.log(data);
     for(count=0;count<5;count++)
     {
         question_list.push(data.results[count].question);
         correct_options.push(data.results[count].correct_answer);
         option_list[count].push(data.results[count].incorrect_answers[0]);
         option_list[count].push(data.results[count].incorrect_answers[1]);
         option_list[count].push(data.results[count].incorrect_answers[2]);
         option_list[count].push(data.results[count].correct_answer);
     }

     for(count=0;count<5;count++)
     {
         option_list[i].sort();
     }

     for(count=0;count<question_list.length;count++)
     {
         var correct_char="";
        for(j=0;j<4;j++)
           {
               if(option_list[count][j]===correct_options[count])
                 correct_char=correct_options[count];
           }
           quiz_data.push({
               question:question_list[count],
               a:option_list[count][0],
               b:option_list[count][1],
               c:option_list[count][2],
               d:option_list[count][3],
               correct_char:correct_options[count],
           });
     }

        show_ques();
     
}



function start()
{
    document.getElementById("start").style.display="none";
    document.getElementById("quizzer").style.display="block";
    document.getElementById("main").style.display="block";
}

function Quit()
{
    document.getElementById("main").style.display="none";
    document.getElementById("quizzer").style.display="block";
    document.getElementById("start").style.display="block";
}

function Continue()
{
    document.getElementById("main").style.display="none";
    document.getElementById("q1").style.display="block";

}

function show_time()
{
   
    if(l>=0)
    {
        //
        if(l>9)
            {
                document.getElementById("showtime").innerHTML="Time left:"+l+"second";
            //    l--;
            //    i++;               
            }

        else
            {
                document.getElementById("showtime").innerHTML="Time left:0"+l+"seconds";
                
             //   let Stop=setInterval(show_time,1000);
             
            }

         // document.getElementById("animation1").style.width=600-i*40+"px";
          l--;
          i++;
        
          if(l<0&&temp<5)
    {
      //  l=15;
     //   i=1;
       clearInterval(stop);
        next_ques();
    }

    }
    
}

function show_ques()
{
    i=1;
    l=15;
    stop= setInterval(show_time,1000);
    show_time();

        document.getElementById("ques").innerHTML=quiz_data[temp].question;
        document.getElementById("option1").innerHTML=quiz_data[temp].a;
        document.getElementById("option2").innerHTML=quiz_data[temp].b;
        document.getElementById("option3").innerHTML=quiz_data[temp].c;
        document.getElementById("option4").innerHTML=quiz_data[temp].d;

}

function next_ques()
{
    if(temp<5)
     {
      
       if(temp+2<=5)
      {
        document.getElementById("ques_num").innerHTML=(temp+2)+'/5 '+'question';
        if(temp+2===5)     
      document.getElementById("next").innerHTML='result';
      }

      else if(temp+2===6)
      result();
       clearInterval(stop);
        temp++;
        show_ques();
        
     }



}

function option1()
{
    document.getElementById("submit").style.backgroundColor='green';
    document.getElementById("box1").style.backgroundColor='lightskyblue';
    document.getElementById("box2").style.backgroundColor='wheat';
    document.getElementById("box3").style.backgroundColor='wheat';
    document.getElementById("box4").style.backgroundColor='wheat';
    a++;
    b=0;
    c=0;
    d=0;
 
}

function option2()
{
    document.getElementById("submit").style.backgroundColor='green';
    document.getElementById("box2").style.backgroundColor='lightskyblue';
    document.getElementById("box1").style.backgroundColor='wheat';
    document.getElementById("box3").style.backgroundColor='wheat';
    document.getElementById("box4").style.backgroundColor='wheat';
    a=0;
    b++;
    c=0;
    d=0;
   
}

function option3()
{
    document.getElementById("submit").style.backgroundColor='green';
    document.getElementById("box3").style.backgroundColor='lightskyblue';
    document.getElementById("box1").style.backgroundColor='wheat';
    document.getElementById("box2").style.backgroundColor='wheat';
    document.getElementById("box4").style.backgroundColor='wheat';
    a=0;
    b=0;
    c++;
    d=0;
    
}

function option4()
{
    document.getElementById("submit").style.backgroundColor='green';
    document.getElementById("box4").style.backgroundColor='lightskyblue';
    document.getElementById("box1").style.backgroundColor='wheat';
    document.getElementById("box2").style.backgroundColor='wheat';
    document.getElementById("box3").style.backgroundColor='wheat';
    a=0;
    b=0;
    c=0;
    d++;
    
}

   
    function submit()
    {
          
        document.getElementById("box1").style.backgroundColor='wheat';
        document.getElementById("box2").style.backgroundColor='wheat';
        document.getElementById("box3").style.backgroundColor='wheat';
        document.getElementById("box4").style.backgroundColor='wheat';
        if(a>0)
     {
        if(quiz_data[temp].a===quiz_data[temp].correct_char)
    {        
        score++;        
        
    }

     }

     else if(b>0)
     {
        if(quiz_data[temp].b===quiz_data[temp].correct_char)
        {     
            score++;       
        }

     }

     else if(c>0)
     {
        if(quiz_data[temp].c===quiz_data[temp].correct_char)
      {
          score++;       
      }

     }

     else if(d>0)
     {
        if(quiz_data[temp].d===quiz_data[temp].correct_char)
        {
            score++;       
        }    
     }
 

    clearInterval(stop);
    next_ques();
    
}

function result()
{
    document.getElementById("q1").style.display="none";
    document.getElementById("timer").style.display="none";
    document.getElementById("ques_num1").style.display="none";
    document.getElementById("scorecard").style.display="block";
    document.getElementById("scorecard_border").style.display="block";
    document.getElementById("marks").innerHTML=score+"/5";
    if (score == 5) 
    document.getElementById("prize").innerHTML = "Excellent 🤩";
    else if (score == 4) 
    document.getElementById("prize").innerHTML = "Good 😀";
    else if (score == 3) 
    document.getElementById("prize").innerHTML = "Average 🙂";
    else
    document.getElementById("prize").innerHTML = "Poor 🙁";
}

   


 