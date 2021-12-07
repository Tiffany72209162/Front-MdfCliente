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
import Informe from '../pages/app/Informes';
import Inspector from '../pages/app/Inspectores';
import Clientes from '../pages/app/Clientes';
import Orden from '../pages/app/Ordenes';
import Reporte from '../pages/app/Reportes';
import { list as ListInspectores } from '../Actions/Inspector/list'
import { list as ListInformes } from '../Actions/Informes/list'
import { useDispatch } from 'react-redux'
import React, { useEffect } from 'react'
import { url } from '../config/Url'
import { FilePdfFilled, UserOutlined, FolderOutlined, CopyFilled, UsergroupAddOutlined } from '@ant-design/icons'
const Token = localStorage.getItem('data')
/* REDUX - Actions */

export const MENU = () => {
	const dispatch = useDispatch()
  
	let Items = [
		{    
			title: "Orden",
			icon: FolderOutlined,
			type: "link",
			path: `${process.env.PUBLIC_URL}/orden`,
			component: Orden,
			active: false,
			bookmark: true,
		},
    {    
			title: "Cliente",
			icon: UsergroupAddOutlined,
			type: "link",
			path: `${process.env.PUBLIC_URL}/cliente`,
			component: Clientes,
			active: false,
			bookmark: true,
		},
		{
			title: "Inspector",
			icon: UserOutlined,
			type: "link",
			path: `${process.env.PUBLIC_URL}/inspector`,
			component: Inspector,
			active: false,
			bookmark: true,
		},
		{
			title: "Informe",
			icon: FilePdfFilled,
			type: "link",
			path: `${process.env.PUBLIC_URL}/informe`,
			component: Informe,
			active: false,
			bookmark: true,
		},
		{
			title: "Reportes",
			icon: CopyFilled,
			type: "link",
			path: `${process.env.PUBLIC_URL}/reportes`,
			component: Reporte,
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
