// import { 
//     Home, 
//     PaperPlane, 
//     CalendarAlt,
//     Circle,
//     Eye,
//     ArrowRight,
//     Clock,
//     Like,
//     DotsVerticalRounded,
//     CardView,
//     MessageCaptions,
//     Share,
//     Plus,
//     Filter,
//     User,
//     RefreshCcwAlt,
//     CaretUp,
//     Compass,
//     ArrowOutLeftSquareHalf,
//     ChevronDown,
//     EyeClosed,
//     LoaderLines,
//     Smile,
//     Sad,
//     Bookmark,
//     Community,
//     Search,
// } from '@boxicons/react'

import { Icon as IconifyIcon } from '@iconify/react'

const Icon = ({
    type,
    size='24',
    color='currentcolor',
    className = '',
    onClick,
    ...restProps
}) => {

    const icons = {
        home: 'mynaui:home',
        logo: 'mynaui:send-solid',
        eye: 'mynaui:eye',
        calendar: 'mynaui:calendar',
        circle: 'material-symbols:circle',
        arrow: 'mynaui:arrow-right',
        clock: 'mynaui:clock-3',
        like: 'mynaui:like',
        filledLike: 'mynaui:like-solid',
        menu: 'mynaui:dots',
        cardView: 'ph:cards',
        comments: 'mynaui:message-dots',
        share: 'mynaui:share',
        plus: 'mynaui:plus',
        filter: 'mynaui:filter-one',
        user: 'mynaui:user',
        update:'mynaui:upload',
        caret: 'tabler:caret-up-filled',
        compass: 'mynaui:compass',
        logout: 'mynaui:logout',
        chevron: 'mynaui:chevron-down',
        eyeClosed: 'mynaui:eye-off',
        spinner: 'mynaui:spinner',
        smile: 'mynaui:smile',
        sad: 'mynaui:sad',
        bookmark: 'mynaui:bookmark',
        friends: 'mynaui:users-group',
        search: 'mynaui:search',
        imageStack: 'ph:images-square-light',
        trash: 'mynaui:trash',
        repeat: 'mynaui:repeat',
        edit: 'mynaui:edit',
        edit_filled: 'mynaui:edit-solid',
        alert: 'mynaui:danger-triangle',
        close: 'mynaui:x',
        check: 'mynaui:check',
        bold: 'mynaui:type-bold',
        italic: 'mynaui:type-italic',
        underline: 'mynaui:type-underline',
        align_left: 'mynaui:text-align-left',
        align_center: 'mynaui:text-align-center',
        align_right: 'mynaui:text-align-right',
        list: 'mynaui:list',
        numbered_list: 'mynaui:list-number',
        code: 'mynaui:code',
        h1: 'heroicons:h1-solid',
        h2: 'heroicons:h2',
        h3: 'heroicons:h3',
        corner: 'proicons:corner-radius'
    }

    const iconName = icons[type] || type; 


    if (!iconName) {
        console.warn(`Icon type "${type}" not found`);
        return null;
    }
    
    return (
        <IconifyIcon
            icon={iconName}
            width={size}
            height={size}
            color={color}
            className={className}
            onClick={onClick}
            style={{ cursor: onClick ? 'pointer' : 'inherit' }}
            {...restProps}
        />
    );

}

export default Icon