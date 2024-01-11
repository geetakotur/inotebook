import React,{useContext} from 'react';
import NoteContext from '../Context/notes/contextNote';

export default function NoteItem(props) {
    const context=useContext(NoteContext);
    const { deletenote} = context;
    const { notes,updateNote } = props;
    return (
        <div className='col-md-3'> 
            <div className="card my-3" >
                <div className="card-body">
                    <h5 className="card-title">{notes.title}</h5>
                    <p className="card-text">{notes.description}</p>
                    <p className="card-text">{notes.tag}</p>
                    <div className='col my-3'>
                    <i className="fa fa-trash mx-2" aria-hidden="true" onClick={()=>{deletenote(notes._id,alert("Note deleted Successfully"))}}></i>
                    <i className="fa fa-pencil mx-2" aria-hidden="true" onClick={()=>{updateNote(notes)}}></i>
                    </div>
                </div>
            </div>
        </div>
    )
}
