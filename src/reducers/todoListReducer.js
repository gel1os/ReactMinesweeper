export const visibilityFilter = (state = 'SHOW_ALL', action) => {
    switch (action.type) {
        case 'SET_VISIBILITY_FILTER':
            return action.filter;
        default:
            return state;
    }
};

export const todo = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return {
                id: action.id,
                text: action.text,
                completed: false,
                archived: false
            };

        case 'TOGGLE_TODO':
            if (state.id !== action.id) {
                return state;
            }

            return {
                ...state,
                completed: !state.completed
            };

        case 'ARCHIVE_TODO':
            if (state.id !== action.id) {
                return state;
            }

            return {
                ...state,
                archived: !state.archived
            };

        default:
            return state;
    }
};

export const todos = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return [
                ...state,
                todo(undefined, action)
            ];

        case 'TOGGLE_TODO':
            return state.map(t => todo(t, action));

        case 'ARCHIVE_TODO':
            return state.map(t => todo(t, action));
        default:
            return state;
    }
};