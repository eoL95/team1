import { ALL_QUESTS_REQUEST, ALL_QUESTS_SUCCESS, ALL_QUESTS_ERROR } from '../constants/allquests';
import { SOME_QUESTS_REQUEST, SOME_QUESTS_SUCCESS, SOME_QUESTS_ERROR} from '../constants/somequests';
import { QUEST_INFO_REQUEST, QUEST_INFO_SUCCESS, QUEST_INFO_ERROR} from '../constants/questinfo';
import { REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, REGISTER_USER_ERROR } from '../constants/users';
import { SET_SPINNER, REMOVE_SPINNER } from '../constants/spinner';

export function GetAllQuests(quests) {
    return (dispatch) => {
        dispatch({
            type: ALL_QUESTS_REQUEST,
            quests: quests
        });

        fetch('/api/quests')
            .then((response) => {
                return response.json()
            })
            .then((user) => {
                dispatch({
                    type: ALL_QUESTS_SUCCESS,
                    quests: user
                });
            });
    }
}

export function GetQuestsByFirstLetters(quests, searchQuery) {
    return (dispatch) => {
        dispatch({
            type: SOME_QUESTS_REQUEST,
            quests: quests
        });

        dispatch({
            type: SET_SPINNER,
            spinner: true
        });

        fetch(`/api/quests/name/${searchQuery}`)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                return response.json();
            })
            .catch(err => {
                dispatch({
                    type: SOME_QUESTS_ERROR,
                    error: true
                })
            })
            .then(quests => {
                dispatch({
                    type: SOME_QUESTS_SUCCESS,
                    quests: quests
                })
            });
    }
}

export function GetQuestInfo(id) {
    return (dispatch) => {
        dispatch({
            type: QUEST_INFO_REQUEST,
            questInfo: []
        });

        fetch(`/api/quests/id/${id}`)
            .then(response => response.json())
            .then(info => {
                dispatch({
                    type: QUEST_INFO_SUCCESS,
                    questInfo: info
                });
            });
    }
}

export function PostUser(user, password) {
    return dispatch => {
        dispatch({
            type: REGISTER_USER_REQUEST,
            user: user
        });

        fetch('/api/users/register', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({user, password})
        })
            .then(response => response.json())
            .then(data => {
                dispatch({
                    type: REGISTER_USER_SUCCESS,
                    token: data.token
                })
            });
    }
}
