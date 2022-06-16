import { gql, useQuery } from '@apollo/client';
import { toast } from 'react-toastify';
import React from 'react'
import "./Avatar"

const GET_AVATAR = gql`
query getavatar($avatar: String){
  getavatar(avatar: $avatar){
    avatar
  }
}
`;

export default function Avatar(props) {
  const { user } =  props;
  const idd = user[1];
  console.log(idd)
    const data = useQuery(GET_AVATAR, {
    variables: { id: idd }
  });
  //console.log(data);
  if(data.loading){
    return <div>Wait...</div>
    
  }
  if(data.error){
    return console.log(data.error);
  }  
  
  return (
    <div>
      <h2>Avatar</h2>
    </div>
  )
}
