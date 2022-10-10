import React from 'react'
import { GetUsers } from '../DataCollection/Request'
import { useEffect, useState } from 'react';

export const RenderMeeting = (props) => {
  var x = [];
  GetUsers().then(res => {res.map((data) => {
    console.log(data);
    x.push(data);
  })});
  setTimeout(()=>{
    return x;
  }, 5000)
}
