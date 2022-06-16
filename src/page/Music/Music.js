import React from 'react'
import { useQuery, gql } from "@apollo/client";
import { withRouter } from 'react-router-dom';
import  BasicLayout  from '../../layout/BasicLayout';
import "./Music.scss"
import { Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Route , Link} from "react-router-dom";

const GET_MUSIC = gql`
  query getMusic {
    update {
      id
      song_name
      song_path
      song_liryc
      artist
    }
  }
`;

function Music() {

    const   data = useQuery(GET_MUSIC)
    if (data.loading) 
    return <h2>Wait...</h2>
    if (data.error) 
    return (console.log(data.error), <h2>Error</h2>)


  return (
    <BasicLayout>
        {data.data.update.map((post) => (
          <ListGroup key={post.id}>    
          <ul>
              <li>
              <Button onClick={() => openInNewTab(post.song_path)}>
                {post.song_name}
              </Button>
              </li>
          </ul>
          </ListGroup>
        ))}           
    </BasicLayout>
  )
}

const openInNewTab = url => {
  window.open(url, '_blank', 'noopener,noreferrer');
};

export default withRouter(Music);