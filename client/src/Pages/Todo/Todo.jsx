import React from 'react';
import { MdDone, MdDelete, MdEdit } from 'react-icons/md';
import { Link } from 'react-router-dom';

function Todo({ title, description, completed, onDelete, onComplete }) {
    return (
        <div className={`p-4 bg-gray-200 m-4 rounded-lg max-w-md shadow-md ${completed ? 'opacity-50' : ''}`}>
            <h2 className="text-xl font-semibold mb-2">{title}</h2>
            <p className="text-gray-700 mb-4 text-lg">{description}</p>
            <div className="flex justify-between items-center">
                <button
                    className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline ${completed ? 'cursor-not-allowed' : ''}`}
                    onClick={onComplete}
                    disabled={completed}
                >
                    {completed ? <MdDone /> : 'Complete'}
                </button>
                <div className="flex">
                    <Link
                        className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-3 rounded mr-2 focus:outline-none focus:shadow-outline"
                        to={`/updateTodo/${title}`}
                    >
                        <MdEdit />
                    </Link>
                    <button
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline"
                        onClick={onDelete}
                    >
                        <MdDelete />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Todo;
