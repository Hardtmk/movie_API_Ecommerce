import React from 'react'
import styles from './trybtn.module.css'

export default function Trybtn({onSubmited,onfilter,FunctionName}) {
  return (
   <div className={styles.filter}>
    <div>
     <p  className={styles.type}>score</p>
<button onClick={()=>onSubmited({score:'numericFilters=vote_average<=7'})}>0-7</button>
<button onClick={()=>onSubmited({score:'numericFilters=vote_average>7'})}>above 7</button>
</div>
 <div>
   <p className={styles.type}>Price</p>
<button onClick={()=>onSubmited({price:'numericFilters=price<=30'})}>$30 or below</button>
<button onClick={()=>onSubmited({price:'numericFilters=price>=30<=60'})}>$30-$60</button>
<button onClick={()=>onSubmited({price:'numericFilters=price>60'})}>above $60</button>
</div>
 <div>
   <p className={styles.type}>Release Date</p>
<button onClick={()=>onSubmited({ release_date:'release_date=release_date<2022/02/01'})}>before February</button>
<button onClick={()=>onSubmited({ release_date:'release_date=release_date>=2022/02/01<=2022/3/01'})}>February</button>
<button onClick={()=>onSubmited({ release_date:'release_date=release_date>=2022/03/01<=2022/04/01'})}>March</button>
<button onClick={()=>onSubmited({ release_date:'release_date=release_date>=2022/04/01<=2022/05/01'})}>April</button>
<button onClick={()=>onSubmited({ release_date:'release_date=release_date>=2022/05/01<=2022/06/01'})}>May</button>
</div>
 <div>
     <p className={styles.type}>Type</p>
<button onClick={()=>onSubmited({ adult:'adult=true'})}>Adult</button>
<button onClick={()=>onSubmited({ adult:'adult=false'})}>Child</button>
</div>
 <div>
     <p className={styles.type}>Sort by...</p>
<button onClick={()=>onSubmited({...onfilter, sort : 'sort=price'})}>sort by price</button>
<button onClick={()=>onSubmited({...onfilter, sort : 'sort=vote_average'})}>sort by score</button>

</div>
   </div>
  )
}
