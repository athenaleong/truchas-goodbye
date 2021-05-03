import React, {useEffect , useState} from 'react';
import {SelectStyled} from './style'

function SelectUser(props) {
    const {setValue, register, allUser, defaultValue} = props;
    const [selectOption, setSelectOption] = useState(defaultValue);

    useEffect(() => {
        register({name: 'people'});
    }, [])

    useEffect(() => {
        setValue('people', selectOption);
    }, [selectOption])

    return (
        <SelectStyled
                        isMulti
                        options={[{value:'all', label:'all users'}, ...allUser]} 
                        onChange={(selected) => {
                            if (selected) {
                                if (selected.filter(option => option.value == "all").length != 0) {
                                    setSelectOption(allUser)
                                } else {
                                    setSelectOption(selected);
                                }
                            }
                        }}
                        classNamePrefix={'Select'}
                        value={selectOption}
        />

    )


}

export default SelectUser;
