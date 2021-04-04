import React, { useState } from "react";
import "./clock.css";
import Lengths from "./Length";

//since it a 25 min and 5 min clock, we want the initial state to show 25:00. set the initial state to 25 * 60

//we have three states for this clock the big display, the break length display and the session diplsay states. set them all using use states

//write a fxn formattime to format the time ie 25min to mm: ss which will be shown in the display. first convert it to minutes so that as it decreases we cann get the rest of the minutes and seconds

//the onchange is a fxn for the btn which when clich decrease or increase the time inb/n the btn. it set the time using the setBreak time or setsession time

//we dont need negative numbers so add another condition to check of the break and session time is not less than 60sces and amount is not less than 0

//we are going to link the session time to the display time, by doing so we set a boolen to false and say if its false which it is, then setDisplayTime to the seeion time + seconds, so as the seeion time keep changing, so is the display time. thinking abt it the setdisplaytime act is like the prev + seconds but the prev is the session time

//center-align is a material css stlye

//below the display session add some buttons for play, pause and reset if the timeris on then show pause other wise show play. second button os for reset to set everything to default

//the playPause fxn is more complicated since ite starts the timer

//setinterval vs settimeout: setTimeout allows us to run a function once after the interval of time. setInterval allows us to run a function repeatedly, starting after the interval of time, then repeating continuously at that interval

//The localStorage and sessionStorage properties allow to save key/value pairs in a web browser.The localStorage object stores data with no expiration date. The data will not be deleted when the browser is closed, and will be available the next day, week, or year.localStorage.setItem("key", "value"); and var lastname = localStorage.getItem("key"); THIS WAY EVEN iF WE CHANGE TAB AND COME BACK TO THIS PAGE IT WILL BE BE RUNNING

//Use the clear() method to delete all items in localStorage . This method, when invoked, clears the entire storage of all records for that domain. It does not receive any parameters.

//the playPause method is where the whole app fxnallity is, we first define some varibles. sec which is in millisecond, time which will store the current time as when it was called, nextTime calls the current time plus one second, a boolean isbreakOn

//if the timer is off/false which is the default state, the play icons is on and is ready to start running(decreasing in seconds). we set an interval which primarily is called every 30ms this accepts a countdown fxn, in the fxn, we call the time again but this time it has a new/current time which is greater than the previously declared nextTime. ii the new time > nextTime then reduce the display time by one (countdown) add one sec to the nextTime to keep it equilibrium. and like i said this fxn will be call every 30ms.

//still in the first if statement (!timerOn) we need to clear the prev local storage first and then set new one ,setItem, to record the setinterval fxn which is running. setitem takes a key = value pair

//while the setinterval fxn is running the timerOn is set to true which shows the pause icons icon. when you click on the button it calls the fxn again(playPause fxn) but this time around the timerOn is true if its true it calls the clears interval fxn which clear the local storage calling the key(id) pointing to that particular storage

//OK WELL DONE: when it hit 0 we want to activate the onBreak boolean and play th sound download/convert beep sound form youtube

//create a new state fro the audio and set the initial state to link to the mp3 file on cloudinary

//create a fxn to play the audio, if the audio is longer than you want you can add a set timout to reduce it. first i set the audio  to current time = 2 to play from the 2seconds you can set 0 to play from beginning

//we are going to implement this audio in the set interval > setDisplay fxn where before the time is display/run/countdown it will check to see if the prev time is not less than zero and if the isOnBreak is false whcih it is if all is true then the countdown will begin if not the audio will play.NOTE onBreak is false bcos by default session time is on 25 * 60. set the onbreak to true which sets isOnbreak to true and return the breakTime to activate the break state

//this is bcos if we leave the timer to run on its own, and the session is done counting down the timer will begin again starting with the break length and counting down from 5 * 60

//so the isOnbreak acts like a toggle is it true set to false and return breakTime and if it false set to true and return session time. the toggle enble us to label the timer as break or session. if it was on break time prev after the alarm sounds it start session counts and vice versa

//finally we want the timer-label to display break if the onbreak is true else display session

function Clock() {
	const [displayTime, setDisplayTime] = useState(25 * 60);
	const [breakTime, setBreakTime] = useState(5 * 60);
	const [sessionTime, setSessionTime] = useState(25 * 60);
	const [timerOn, setTimerOn] = useState(false);
	const [onBreak, setOnBreak] = useState(false);

	const playBreakAudio = () => {
		const breakAudio = document.getElementById("beep");
		breakAudio.currentTime = 2;
		breakAudio.play();
	};

	const formatTime = (time) => {
		let min = Math.floor(time / 60);
		let sec = time % 60;
		return (min < 10 ? "0" + min : min) + ":" + (sec < 10 ? "0" + sec : sec);
	};

	//so to keep only min and not plus seconds
	const formatLengths = (time) => {
		let min = Math.floor(time / 60);
		return min;
	};

	//for increase and decrease btns. if its showing 1 dont go down further to 0, -1
	const changeTime = (seconds, type) => {
		if (type === "break") {
			if (breakTime <= 60 && seconds < 0) {
				return;
			}
			setBreakTime((prev) => prev + seconds);
		} else {
			if (sessionTime <= 60 && seconds < 0) {
				return;
			}
			setSessionTime((prev) => prev + seconds);
			if (!timerOn) {
				//while changing time ther the timer is always off
				setDisplayTime(sessionTime + seconds);
			}
		}
	};

	//everything at default state setting it afresh/what happens if you click the play/pause btn
	const playPause = () => {
		let second = 1000;
		let time = new Date().getTime();
		let nextTime = new Date().getTime() + second;
		let isOnBreak = onBreak; // cld also have onBreak straightaway

		//this will will be calle every 30s running forvever, the if state is like a toglle either break or session
		if (!timerOn) {
			let interval = setInterval(() => {
				time = new Date().getTime();
				if (time > nextTime) {
					setDisplayTime((prev) => {
						if (prev <= 0 && !isOnBreak) {
							playBreakAudio();
							//isOnBreak = true;
							setOnBreak(true);
							return breakTime;
						} else if (prev <= 0 && isOnBreak) {
							playBreakAudio();
							// isOnBreak = false;
							setOnBreak(false);
							return sessionTime;
						}
						return prev - 1;
					});
					nextTime += second;
				}
			}, 30);

			localStorage.clear();
			localStorage.setItem("interval-id", interval);
		}

		//if timer is working we want to be clearing the intervals
		if (timerOn) {
			clearInterval(localStorage.getItem("interval-id"));
		}

		//back to default
		setTimerOn(!timerOn);
	};

	const reset = () => {
		setBreakTime(5 * 60);
		setSessionTime(25 * 60);
		setDisplayTime(25 * 60);
	};

	return (
		<div className="root center-align">
			<h1 className="title">Pomodoro Clock</h1>
			<div className="length-container  center-align">
				<Lengths
					type={"break"}
					titleId={"break-label"}
					title={"Break Length"}
					clickUp={changeTime}
					incrementId={"break-increment"}
					decrementId={"break-decrement"}
					lengthId={"break-length"}
					formatTime={formatLengths(breakTime)}
				/>

				<Lengths
					type={"session"}
					titleId={"session-label"}
					title={"Session Length"}
					clickUp={changeTime}
					incrementId={"session-increment"}
					decrementId={"session-decrement"}
					lengthId={"session-length"}
					formatTime={formatLengths(sessionTime)}
				/>
			</div>

			<div id="display">
				<h4 id="timer-label">{onBreak ? "Break" : "Session"}</h4>
				<h1 id="time-left">{formatTime(displayTime)}</h1>
			</div>

			<button id="start_stop" className="btn-large black" onClick={playPause}>
				{timerOn ? (
					<i className="material-icons">pause</i>
				) : (
					<i className="material-icons">play_arrow</i>
				)}
			</button>

			<button id="reset" className="btn-large black" onClick={reset}>
				<i className="material-icons renew">autorenew</i>
			</button>
			<audio
				id="beep"
				src="https://res.cloudinary.com/dytnpjxrd/video/upload/v1614627065/FREE_Censor_Beep_sound_effect_iunqul.mp3"
			/>
			<footer className="p-2 text-dark mt-2">
				<p className="text-center">
					-- made by
					<a
						className="text-dark"
						href="https://codepen.io/marsiya-issah"
						target="_blank"
						rel="noreferrer"
					>
						<strong> Marsiya Issah</strong>
					</a>
				</p>
			</footer>
		</div>
	);
}

export default Clock;
