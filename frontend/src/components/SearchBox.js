import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { Search } from '@material-ui/icons';

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      history.push(`/search/${keyword}`)
    } else {
      history.push('/')
    }
  }

  return (
    <Form onSubmit={submitHandler} inline>
      <Form.Control
        type='text'
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
        placeholder='Search Products...'
        className='mr-sm-2 ml-sm-5'
        style={{ width: '400px' }}
      ></Form.Control>
      <Button type='submit' variant='outline-success' className='p-2 btn btn-secondary'>
        <Search style={{ color: 'black' }}/>  
      </Button>
    </Form>
  )
}

export default SearchBox