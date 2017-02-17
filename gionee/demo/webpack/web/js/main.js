'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import Name from './name';
import {Router,Route,Link,IndexRoute,Redirect,hashHistory,browserHistory} from 'react-router';
import Style from '../css/style.css';
import png3 from '../images/3.png';

class App extends React.Component {
	render () {
		return (
			<div>
				<Picture/>
				<Name/>
				<div>
					<Link to="/">首页</Link>
					<Link to="/tv" query={{orderBy:'date'}} >电视</Link>
				</div>
				{this.props.children}
				<div className={Style.big,Style.other}>3333333333333333</div>
			</div>
		)
	}
}

class Picture extends React.Component {
		render () {
			return (

				<div className={Style.some}>
					<img style={{"height":"50px"}} src={require('../images/1.jpg')}/>
					<div style={{"background":"url("+png3+")" ,"width":"100px" ,"height":"100px","backgroundSize":"cover"}}></div>
				</div>
			)
		}
}

class TV extends React.Component {
	constructor(props){
		super(props);
		let {query} = this.props.location;
		console.log(query);
	}
	render () {
		return (
			<div>
				{this.props.children}
			</div>
		)
	}
}

class Show extends React.Component {
	constructor (props) {
		super(props);
	}
	render () {
		return (
			<h2>节目{this.props.params.id}</h2>
		);
	}
}

class Home extends React.Component {
	render () {
		return (
			<div>首页内容</div>
		);
	}
}

class ShowIndex extends React.Component {
	render () {
		return (
			<div>电视节目列000</div>
		);
	}
}

function enter () {
	console.log("进入");
}

function leave () {
	console.log("离开");
}

ReactDOM.render((
	<Router history={browserHistory}>
		<Route path="/" component={App}>
			<IndexRoute component={Home}/>
			<Route path="tv" component={TV}>
				<IndexRoute path="" component={ShowIndex}/>
				<Route path="/shows/:id" component={Show} onEnter={enter} onLeave={leave}/>
				<Redirect from="shows/:id" to="/shows/:id" />
			</Route>
		</Route>
	</Router>
),document.body);
