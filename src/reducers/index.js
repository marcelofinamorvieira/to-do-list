import { ADD_REMINDER, DELETE_REMINDER, CLEAR_REMINDERS } from "../constants.js";
import { bake_cookie, read_cookie } from "sfcookies";

const reminder = (action) => {
    return {
        text: action.text,
        date: action.date,
        id: Math.random()
    }
}

const reminders = (state = [], action) => {
    let reminders = null;
    state = read_cookie("reminders");
    switch(action.type) {
        case ADD_REMINDER:
            reminders = [...state, reminder(action)];
            bake_cookie("reminders", reminders);
            return reminders;
        case DELETE_REMINDER:
            reminders = state.filter(item => item.id !== action.id);
            bake_cookie("reminders", reminders);
            return reminders;
        case CLEAR_REMINDERS:
            reminders = [];
            bake_cookie("reminders", reminders);
            return reminders;
        default:
            return state;
    }
}

export default reminders;