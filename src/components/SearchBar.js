import React from "react";

class SearchBar extends React.Component {
    
    preventRefresh = (event)=>{
        event.preventDefault(event)
    }

    render() {
        return (
            <form onSubmit={this.preventRefresh}>
                <div className="form-row m-5">
                    <div className="col-12">
                        <input
                            onChange={this.props.searchMovieProp}
                            type="text"
                            className="form-control"
                            placeholder="Search a Movie"
                        />
                    </div>
                </div>
            </form>
        );
    }


}

export default SearchBar;
