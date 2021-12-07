import {
	File,
	Monitor,
	Home,
	Award,
	PhoneCall,
	Airplay,
	Users,
	Settings
} from "react-feather";
import Informe from '../pages/Informes/index';
import Inspector from '../pages/Inspectores/index';
import Orden from '../pages/Ordenes/index';
import { list as ListInspectores } from '../Actions/Inspector/list'
import { list as ListInformes } from '../Actions/Informes/list'
import { useDispatch } from 'react-redux'
import React, { useEffect } from 'react'
import { url } from '../config/Url'
const Token = localStorage.getItem('data')
/* REDUX - Actions */

export const MENU = () => {
	//let config = JSON.parse(modules);
	const dispatch = useDispatch()

  useEffect(() => {
    dispatch(ListInspectores(url +'inspector/', { defaultCurrent: 1, pageSize: 10, Token}))
  }, [])
  useEffect(() => {
    dispatch(ListInformes(url +'informe/', { defaultCurrent: 1, pageSize: 10 }, Token ))
  }, [])
	let Items = [
		{    
			title: "Orden",
			icon: Home,
			type: "link",
			path: `${process.env.PUBLIC_URL}/orden`,
			component: Orden,
			active: false,
			bookmark: true,
		},
		{
			title: "Inspector",
			icon: Award,
			type: "link",
			path: `${process.env.PUBLIC_URL}/inspector`,
			component: Inspector,
			active: false,
			bookmark: true,
		},
		{
			title: "Informe",
			icon: Award,
			type: "link",
			path: `${process.env.PUBLIC_URL}/informe`,
			component: Informe,
			active: false,
			bookmark: true,
		}
	];
	let cleanArray = Items.filter(function (el) {
		return Object.keys(el).length !== 0;
	});

	let page = "";
	if (typeof cleanArray[0].path !== "undefined") {
		page = cleanArray[0].path;
	} else if (typeof cleanArray[0].children[0].path !== "undefined") {
		page = cleanArray[0].children[0].path;
	} else {
		page = cleanArray[0].children[0].children[0].path;
	}

	return { cleanArray, page };
};
