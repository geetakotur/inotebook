
import React, { useContext, useEffect, useRef,useState } from 'react';
import NoteContext from '../Context/notes/contextNote';
import NoteItem from './NoteItem';
import Addnote from './Addnote';
import { useNavigate } from 'react-router-dom';

export default function Notes() {
  const context = useContext(NoteContext);
  const navigate=useNavigate;
  const { notes, getnote,editnote } = context;
  useEffect(() => {
    if(localStorage.getItem('token')){
    getnote()}
    else{
      navigate("/home");
    }
    // eslint-disable-next-line
  }, [])

  const ref = useRef(null)
  const refclose = useRef(null)
  const [note, setnote] = useState({ id:"",etitle: "", edescription: "", etag: "" })
  const updateNote = (currentnote) => {
   
    ref.current.click();
    setnote({id:currentnote._id,etitle:currentnote.title,edescription:currentnote.description,etag:currentnote.tag})
   
  }
  const handleClick = (e) => {
    console.log("updating");
    editnote(note.id,note.etitle,note.edescription,note.etag)
    refclose.current.click();
    alert("Note updated Successfully")
    
}

const handleChange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value })
}

  return (
    <>
      <Addnote />
     
      
<button ref={ref} type="button" className="btn btn-primary d-none" data-toggle="modal" data-target="#exampleModal">
  Launch demo modal
</button>


<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
        <button type="button" className="btn-close" data-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" value={note.etitle} onChange={handleChange} minLength={5} required />
                        <div id="emailHelp" className="form-text"></div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={handleChange} minLength={5} required  />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={handleChange} minLength={5} required  />
                    </div>
                   
                </form>
      </div>
      <div className="modal-footer">
        <button ref={refclose} type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
        <button disabled={note.etitle.length<5 || note.edescription.length<5} onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
      </div>
    </div>
  </div>
</div>
      <div className="container row my-3">
        <h2>Your notes</h2>
        <div className="container">
          {notes.length===0 && "No notes to display,please add one"}
        </div>
        {notes.map((notes) => {
          return <NoteItem key={notes._id} updateNote={updateNote} notes={notes} />

        })}

      </div>
    </>
  )
}
