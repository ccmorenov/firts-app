import React, { Component } from 'react';
import { useParams } from "react-router-dom";
import BasicLayout from '../../layout/BasicLayout';

export default function PlayMusic() {


  const {song} = useParams();
  console.log(song);


  return (
    <BasicLayout>
     <h1>Hola. {song}</h1>
    </BasicLayout>  
  )
}
