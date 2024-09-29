'use strict'

"use strict";

import { getData } from '../config/axios.config.js';
// import { get } from '../routes/explore.route.js';

import {  getUrlQuery } from '../utils/helpers.util.js';

const getSeveralDetail = async (req) => {
    const { offset, limit, page } = getUrlQuery(req.params);

    const { data: { categories } } = await getData(`/browse/categories?limit=${limit}&offset=${offset}`, req.cookies.access_token);

    return { baseUrl: req.baseUrl, page, name: 'Explore', ...categories };
};

const getDetail = async (req) => {
    const { categoryId } = req.params;

    const { data: catInfo } = await getData(`/browse/categories/${categoryId}`, req.cookies.access_token);

    return catInfo;
};

export {
    getSeveralDetail,
    getDetail
};