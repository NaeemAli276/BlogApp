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
    ArrowOutLeftSquareHalf
} from '@boxicons/react'

export const Icon = ({
    type,
    size='sm',
    color='currentcolor',
    className = '',
    onClick
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
        chevron: CaretUp,
        compass: Compass,
        logout: ArrowOutLeftSquareHalf
    }

    const IconComponent = icons[type];
    
    if (!IconComponent) {
        console.warn(`Icon type "${type}" not found`);
        return null;
    }
    
    return (
        <IconComponent 
            size={size} 
            color={color} 
            className={className}
            onClick={onClick}
            style={{ cursor: onClick ? 'pointer' : 'default' }}
        />
    );

}