import React from 'react'
import BasicLayout from "../../layout/BasicLayout/BasicLayout";
import { useQuery, gql } from "@apollo/client";
import { Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import "./Home.scss";
import { enableRipple } from '@syncfusion/ej2-base';
enableRipple(true);

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

export default function Home(props) {

  let state = { content: 'Play', iconCss: 'e-btn-sb-icon e-play-icon' };
  const   data = useQuery(GET_MUSIC)
    console.log(data)
    if (data.loading) 
    return <h2>Wait...</h2>
    if (data.error) 
    return (console.log(data.error), <h2>Error</h2>)
    
    const {setRefreshCheckLogin}=props;
    
    return (
      <html lang="en">
<head>
    <title>Syncfusion React Button</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Essential JS 2 for React Components" />
    <meta name="author" content="Syncfusion" />
    <link href="//cdn.syncfusion.com/ej2/20.1.58/ej2-base/styles/material.css" rel="stylesheet" />
    <link href="//cdn.syncfusion.com/ej2/20.1.58/ej2-buttons/styles/material.css" rel="stylesheet" />
	<link href="index.css" rel="stylesheet" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/systemjs/0.19.38/system.js"></script>
    <script src="systemjs.config.js"></script>
</head>
    <div>
      <BasicLayout className="home" setRefreshCheckLogin={setRefreshCheckLogin}>
      {data.data.update.map((post) => (
          <ListGroup key={post.id}>    
          <ul>
              <li>
              <ButtonComponent cssClass='e-flat' iconCss='e-btn-sb-icon e-play-icon' onClick={() => openInNewTab(post.song_path)}>
                {post.song_name}
              </ButtonComponent>
              </li>
          </ul>
          </ListGroup>
        ))}
      </BasicLayout>
      
    </div>
    </html>
  )
}
const openInNewTab = url => {
  window.open(url, '_blank', 'noopener,noreferrer');
};
