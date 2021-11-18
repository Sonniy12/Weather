
let Img_=document.getElementById("img_");

let input_name=document.getElementById("Name_city");

window.onload=function(){
	$(".form_program").hide(); 	
}

function Weather_( result, Img )
{
if(result=="облачно с прояснениями"||result=="небольшая облачность")
{
Img.src="img/2.jpg";
}
if(result=="ясно")
{
Img.src="img/1.jpg";
}
if(result=="переменная облачность" ||result=="пасмурно" )//облачно с прояснениями
{
Img.src="img/5.jpg";
}
if(result=="снег" || result=="небольшой снег")//небольшой снег
{
Img.src="img/9.jpg";
}
if(result=="дождь" || result=="небольшой дождь")//небольшой дождь
{
Img.src="img/8.jpg";
}
if(result=="снег с дождем")
{
Img.src="img/6.jpg";
}
if(result=="сильный ветер" ||result=="буран" ||result=="ураган")
{
Img.src="img/7.jpg";
}
if(result=="смог" ||result=="дымка" ||result=="туман")
{
Img.src="img/4.jpg";
}
if(result=="гроза" ||result=="сильный ливень" ||result=="ливень")
{
Img.src="img/3.jpg";
}
}


function Myfunc()
{
	
	// API ключ
let apiKey = "5871059e5a6049233c71cd6e84bf7ec4";
	//city name
	let city_name=input_name.value;
	let url;

if(city_name =="")
{
	$(".form_program").text("Error! Enter the name of the city in English.");
	$(".form_program").css({color: "white", backgroundColor: "red", 'font-size': "40px",  marginTop: "2%" ,paddingTop: "2%"});

}
	  url =`http://api.openweathermap.org/data/2.5/forecast?q=${city_name}&lang=ru&cnt=6&units=metric&appid=${apiKey}`;//http://api.openweathermap.org/data/2.5/weather?q=${city}&lang=ru&units=metric&appid=${apiKey}`;
	// Формируем url для GET запроса вывод на каждые 3 часа

	// show form
	$(".form_program").show(); 	
	//===================
	//проверка браузера старый или новый
let connection;
if(window.XMLHttpRequest)
{
connection=new XMLHttpRequest();//иначе создать новый обЪект для запроса
}
else{
	connection=new ActiveXObject("Microsoft.XMLHTTP")//иначе создать старый обЪект для запроса
}
//объявления запроса
connection.open("Get",url);
//отправка запроса на сервер file.txt
//connection.send();
connection.responseType="json";
//подписка на событие onreadystatechange
connection.onreadystatechange=function()
{
console.log(connection.readyState);
if(connection.readyState===4 && connection.status===200)
{
	console.log(connection.response);


//alert("log+password= "+connection.response);
let obj=connection.response;//автоматически распарсит по ключам 
	// document.querySelector('.city').innerHTML = res.data.name
   // Вывод город
let city_n=connection.response.city.name;
		
//alert(city_n);
let txt=document.getElementById("box_city");
	txt.innerHTML=city_n+"\n";
	
	let count=0;

		//count++;
	   // Вывод погода
let weather_n=connection.response.list[0].weather[0]['description'];
		
//alert(weather_n);
let txt2=document.getElementById("box_description");
	txt2.innerHTML=weather_n+"\n";

	//weather
	Weather_(weather_n,Img_);

	
   // Вывод темп
let temp_n=connection.response.list[0].main.temp;
		
//alert(temp_n);
let txt3=document.getElementById("box_temp");
	txt3.innerHTML=temp_n+" C";
		//min
		let temp_min=connection.response.list[0].main.temp_min;
		
//alert(temp_n);
let txt7=document.getElementById("box_minTemp");
	txt7.innerHTML+="		"+temp_min+"\n";
		
		//max
		let temp_max=connection.response.list[0].main.temp_max;
		
//alert(temp_n);
let txt8=document.getElementById("box_maxTemp");
	txt8.innerHTML+="		"+temp_max+"\n";
		
	   // Вывод ветер
let wind_n=connection.response.list[0].wind.speed;
		
//alert(wind_n);
let txt4=document.getElementById("box_wind");
	txt4.innerHTML+="			 "+wind_n+"\n";
	
	 // Вывод влажность
//let humidity_n=connection.response.list[i].main.humidity;
		
//alert(humidity_n);
/*let txt5=document.getElementById("box5");
	txt5.innerHTML+=count+"#  "+humidity_n+"\n";*/
	
		 // Вывод дни, ветер, погода, темп-ра
	
let day_n=connection.response.list[0].dt_txt;

		
//alert( day_n);
let txt6=document.getElementById("box_dt");
	txt6.innerHTML=""+day_n+"\n";
//таблица  #forecast_table, #wind_table,#temp_table
	let dtTable=document.getElementById("dt_table");
	dtTable.innerHTML=""+day_n+"\n";

	//let forecastTable =document.getElementById("forecast_table");
	//forecastTable.innerHTML=""+weather_n+"\n";

	//let windTable =document.getElementById("wind_table");
	//windTable.innerHTML=""+wind_n+"\n";

	//let tempTable =document.getElementById("temp_table");
	//tempTable.innerHTML=""+temp_n+"\n";


	let data, dtTable_;
	let forecast_,forTable_;
	let wind_,winTable_;
	let temp_,temTable_;
	let imgTable_;

	
	
	for(var i=0;i<6; i++)
		{     //day
			dtTable_ =document.getElementById("dt_table"+(i));			
			data = connection.response.list[i].dt_txt;
			dtTable_.innerHTML=data;
			//forecast
			forTable_ =document.getElementById("forecast_table"+(i));			
			forecast_ = connection.response.list[i].weather[0]['description'];
			forTable_.innerHTML=forecast_;
			//wind
			winTable_ =document.getElementById("wind_table"+(i));			
			wind_ = connection.response.list[i].wind.speed;
			winTable_.innerHTML=wind_;
			//temp
			temTable_ =document.getElementById("temp_table"+(i));			
			temp_ = connection.response.list[i].main.temp;
			temTable_.innerHTML=temp_;
			//img
			imgTable_=document.getElementById("imgTable"+(i));	
			Weather_(forecast_,imgTable_);

			
		}
		

	
	
}
}
connection.send();
}