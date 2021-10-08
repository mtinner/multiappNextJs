import React, { Fragment } from "react"
import {Hallo} from "../../shared/Hallo";

export default function Blog({base}:{base:string}){
    console.log(base)
    return <Fragment><Hallo/><h1>blog</h1></Fragment>
}