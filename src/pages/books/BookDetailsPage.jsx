import React, {useState,useEffect } from 'react';
import { BookEdit } from '../../components/app/books/BookEdit';
import { BookTable } from '../../components/app/books/BookTable';
import { LayoutPage } from '../../components/layouts/LayoutPage';
import { selectEntity } from '../../store/requests';

export function BookDetailsPage() {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const params = new URLSearchParams(window.location.pathname);
    const [id,setId] = useState();
    const [loadingId,setLoadingId] = useState(false);
    const [book,setBook] = useState();
    const [loadingBook,setLoadingBook] = useState(false);
    useEffect(()=>{
        const getBook= async (bookId)=>{
            const results = await (await selectEntity('book',{id:bookId})).data.results;
            setBook(results[0]);
        }
        if(!id){
            setId(params.get('id'));
        }
        if(id && !loadingId){
            getBook(id);
            setLoadingId(true);
        }
        if(book && !loadingBook){
            setLoadingBook(true);
        }
    },[id, loadingId, loadingBook, params, book]);

    return (
        <LayoutPage>
            <LayoutPage.Main>
                <LayoutPage.Section>
                 <BookTable book={book} />
                </LayoutPage.Section>
                <LayoutPage.Section>
                    <BookEdit setBookTable={setBook} />
                </LayoutPage.Section>
            </LayoutPage.Main>
        </LayoutPage>
    );
}