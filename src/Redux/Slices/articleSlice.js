import { createSlice } from "@reduxjs/toolkit";

const initialState={
    article:{
        url:"",
        summary: ""
    },
    allArticles:[],
    copied:"",
    loading:false,
    error:false
}

export const articleSlice=createSlice({
    name:"articleSlice",
    initialState,
    reducers:{
        setAllArticles:(state,actions)=>{
            state.allArticles=actions.payload;
        },
        setArticle:(state,actions)=>{
            state.article=actions.payload; 
        },
        setError:(state,actions)=>{
            state.error=actions.payload
        },
        setCopied:(state,actions)=>{
            state.copied=actions.payload
        },
        setLoading:(state,actions)=>{
            state.loading=actions.payload
        },
        setArticleUrl:(state,actions)=>{
            state.article.url=actions.payload; 
        }
    }
})

export const {setAllArticles,setArticle,setError,setCopied,setLoading,setArticleUrl}=articleSlice.actions;
export default articleSlice.reducer;