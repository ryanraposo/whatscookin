import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_COMMENT } from '../../utils/mutations';

import Button from 'react-bootstrap/Button';


const CommentForm = ({ postId }) => {
    const [CommentBody, setBody] = useState('');
    const [characterCount, setCharacterCount] = useState(0);
    const [addComment, { error }] = useMutation(ADD_COMMENT);

    const handleChange = event => {
        if (event.target.value.length <= 280) {
            setBody(event.target.value);
            setCharacterCount(event.target.value.length);
        }
    };

    const handleFormSubmit = async event => {
        event.preventDefault();
        try {
            await addComment({
                variables: { CommentBody, postId }
            });
            setBody('');
            setCharacterCount(0);
        } catch (e) {
            console.error(e);
        }
    };
    
    return (
        <div>
            <p className={`m-0 ${characterCount === 280 || error ? 'text-error' : ''}`}>
                Character Count: {characterCount}/280 
                {error && <span className="ml-2" style={{color: "red"}}> Something went wrong...</span>}
            </p>
            <form 
                className="flex-row justify-center justify-space-between-md align-stretch"
                onSubmit={handleFormSubmit}
            >
                <textarea
                    placeholder="Leave a Comment..."
                    className="form-input col-12 col-md-9"
                    onChange={handleChange}
                ></textarea>
                <br/>
                <Button variant="primary" type="submit">Submit</Button>
            </form>
        </div>
    );
};


export default CommentForm;