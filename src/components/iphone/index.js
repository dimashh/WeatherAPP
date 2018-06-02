// import preact
import { h, render, Component } from 'preact';

// import scrollbar functionality
import ReactScrollbar from 'react-scrollbar-js';

// import stylesheets for ipad & button
import style from './style';

// import jquery for API calls
import $ from 'jquery';

export default class Iphone extends Component {
//var Iphone = React.createClass({

	// a constructor with initial set states
	constructor(props){
		super(props);
		// temperature state
		this.state.temp = "";

		//setting the url of the api
		var url = "http://api.wunderground.com/api/7b72123ec2a86820/conditions/q/UK/";
		var second= '.json';
		this.setState({inputt: 'London'});
		const text = this.state.inputt;
		this.setState({address: `${url}${text}${second}`});
		this.fetchWeatherData();
	}

	// a call to fetch weather data via wunderground
	fetchWeatherData = () => {
		// API URL with a structure of : ttp://api.wunderground.com/api/key/feature/q/country-code/city.json
		var url = "http://api.wunderground.com/api/7b72123ec2a86820/conditions/q/UK/London.json";
		$.ajax({
			url: this.state.address,
			dataType: "jsonp",
			success : this.parseResponse,
			error : function(req, err){ console.log('API call failed ' + err); }
		})
		// once the data grabbed, hide the button
		this.setState({ display: false });
	}

	//gets the input value
	handleChange = (evt) => {
	    this.setState({
	     neww: evt.target.value.substr(0,100)
	   });
	  }
	//changes the url of the api to the inputted city
	Change = () => {
	  this.setState({
	    inputt: this.state.neww,
	    neww: ''
	  });

	  var url = "http://api.wunderground.com/api/7b72123ec2a86820/conditions/q/UK/";
	  var second= '.json';

	  const text = this.state.inputt;
	  this.setState({address: `${url}${text}${second}`});

	  this.fetchWeatherData();
	}

	// the main render method for the iphone component
	render() {
		// check if temperature data is fetched, if so add the sign styling to the page
		const tempStyles = this.state.temp ? `${style.temperature} ${style.filled}` : style.temperature;

		// const pr = if(this.state.precip>30) {"a"} else {"b"};

    //scroll bar props
    const myScrollbar = {
      minHeight: 170,
    	/*top: -128,*/
    	width: 414,
    	height: 170,
    };

    const myScrollbar2 = {
      width: 630,
    };

		// display all weather data
		return (

			<div class={ style.container }>


				<div class={style.top}>
					<p>city:</p>
					<input type ="text" value={this.state.valuee} onChange={this.handleChange} />
					<input type ="submit" onClick={this.Change} />
		     </div>

				<div class={ style.header }>
					<table>
						<tr>
								<td colspan = "2">
										<div class={ style.city }>{ this.state.locate }</div>
										<div class={ style.conditions }>{ this.state.cond }</div>
								</td>
						</tr>
						<tr>
								<td >
										<div id="tdata" class={ tempStyles }>{ this.state.temp }</div>
								</td>

								<td>
									<div class={ style.cond }>{ this.state.wind + " kph"}</div>
									<div class={ style.conditions }>{ this.state.wind_d }</div>
								</td>
						</tr>
		        <tr>
								<td>

									<div class={ style.cond }>{ this.state.vis + " km" }</div>
								</td>
								<td>
									<div><p style="font-size:28px">{this.state.percip >20? null:'❌'} </p></div>
								</td>
						</tr>
						<tr>
								<td colspan = "2">
										<div style="color: yellow; text-align: left;">
										<img id={style.advice_img} src="assets/equ/advisories.jpg" />
											Advisories</div>
										<div style="text-align: left;">
											<b>{this.state.percip >20? 'Muddy field':'Dry field'} </b>
												<br></br>

											<b>{this.state.wind> 13? 'Strong wind':'Gentle wind'}</b>
												<br></br>

											<b>{this.state.vis >=10? 'Good visibility': 'Poor visibility'}</b>
										</div>
								</td>
						</tr>
       		</table>
				</div>

				<div class={ style.details }></div>

        <p id={ style.equ_rec_title }>Equiptment Recomendations</p>
        <div id={ style.transparent_box }></div>

        <ReactScrollbar style={myScrollbar} >
          <div style={myScrollbar2} className="should-have-a-children scroll-me">
            <img id={ style.test_img } onClick={img1_pop} src="assets/equ/img_1.png" />
            <img id={ style.test_img } onClick={img2_pop} src="assets/equ/img_2.png" />
            <img id={ style.test_img } onClick={img3_pop} src="assets/equ/img_3.png" />
          </div>
        </ReactScrollbar>
			</div>


		);
	}

// <span class={ tempStyles }>{ this.state.yesterday }</span>
	parseResponse = (parsed_json) => {
		var location = parsed_json['current_observation']['display_location']['city'];
		var temp_c = parsed_json['current_observation']['temp_c'];
		var conditions = parsed_json['current_observation']['weather'];
		var visib = parsed_json['current_observation']['visibility_km'];
		var wind_speed = parsed_json['current_observation']['wind_kph'];
		var wind_dir = parsed_json['current_observation']['wind_dir'];
		var pr = parsed_json['current_observation']['precip_today_metric'];
		var prh = parsed_json['current_observation']['precip_1hr_metric'];

		// set states for fields so they could be rendered later on
		this.setState({
			locate: location,
			temp: temp_c,
			cond : conditions,
			vis : visib,
			wind : wind_speed,
			wind_d : wind_dir,
			precip : pr, //precipitation day
			preciph : prh //precipitation 1hour
		});
	}
}

function img1_pop() {
  window.open("https://www.bzpaintball.co.uk/proto-switch-el-with-smoke-thermal-lens-black" ,'_blank');
}

function img2_pop() {
  window.open("https://www.bzpaintball.co.uk/tippmann-a5" ,'_blank');
}

function img3_pop() {
  window.open("https://www.bzpaintball.co.uk/hk-army-hstl-line-jersey-black-grey" ,'_blank');
}
