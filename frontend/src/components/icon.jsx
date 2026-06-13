import { 
    Home, 
    PaperPlane, 
    CalendarAlt,
    Circle,
    Eye,
    ArrowRight,
    Clock,
    Like,
    DotsVerticalRounded,
    CardView,
    MessageCaptions,
    Share,
    Plus,
    Filter,
    User,
    RefreshCcwAlt,
    CaretUp,
    Compass,
    ArrowOutLeftSquareHalf,
    ChevronDown,
    EyeClosed,
} from '@boxicons/react'

const Icon = ({
    type,
    size='sm',
    color='currentcolor',
    className = '',
    onClick,
    pack='basic'
}) => {

    const icons = {
        home: Home,
        logo: PaperPlane,
        eye: Eye,
        calendar: CalendarAlt,
        circle: Circle,
        arrow: ArrowRight,
        Clock: Clock,
        like: Like,
        menu: DotsVerticalRounded,
        cardView: CardView,
        comments: MessageCaptions,
        share: Share,
        plus: Plus,
        filter: Filter,
        user: User,
        update:RefreshCcwAlt,
        caret: CaretUp,
        compass: Compass,
        logout: ArrowOutLeftSquareHalf,
        chevron: ChevronDown,
        eyeClosed: EyeClosed
    }

    const IconComponent = icons[type];
    
    if (!IconComponent) {
        console.warn(`Icon type "${type}" not found`);
        return null;
    }
    
    return (
        <IconComponent 
            size={size} 
            pack={pack}
            color={color} 
            className={className}
            onClick={onClick}
            style={{ cursor: onClick ? 'pointer' : 'default' }}
        />
    );

}

export default Icon