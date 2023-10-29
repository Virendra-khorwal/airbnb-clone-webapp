"use client";

import useCountries from "@hooks/useCountries";
import { Listing, Reservation, User } from "@prisma/client";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import Image from "next/image";
import HeartButton from "@components/HeartButton";
import Button from "@components/Button";

interface ListingCardProps {
	data: Listing;
	reservation?: Reservation;
	onAction?: (id: string) => void;
	disabled?: boolean;
	actionLabel?: string;
	actionId?: string;
	currentUser?: User | null;
}

const ListingCard: React.FC<ListingCardProps> = ({
	data,
	reservation,
	onAction,
	disabled,
	actionLabel,
	actionId = "",
	currentUser,
}) => {
	const router = useRouter();
	const { getByValue } = useCountries();

	const location = getByValue(data.locationValue);

	const handleCancel = useCallback(
		(e: React.MouseEvent<HTMLButtonElement>) => {
			e.stopPropagation();

			if (disabled) {
				return;
			}

			onAction?.(actionId);
		},
		[onAction, actionId, disabled]
	);

	const price = useMemo(() => {
		if (reservation) {
			return reservation.totalPrice;
		}

		return data.price;
	}, [reservation, data.price]);

	const reservationDate = useMemo(() => {
		if (!reservation) {
			return null;
		}

		const start = new Date(reservation.startDate);
		const end = new Date(reservation.endDate);

		return `${format(start, "PP")} - ${format(end, "PP")}`;
	}, [reservation]);

	return (
		<div
			onClick={() => router.push(`/listings/${data.id}`)}
			className="col-span-1 cursor-pointer group"
		>
			<div className="flex flex-col gap-2 w-full">
				<div className="aspect-square w-full relative overflow-hidden rounded-xl">
					<Image
						fill
						alt="Listing"
						src={data.imageSrc}
						className="object-cover  group-hover:scale-110 transition w-full h-full"
					/>
                    <div className="absolute top-3 right-3">
                        <HeartButton listingId={data.id} currentUser={currentUser} />
                    </div>
				</div>
                <h2 className="font-semibold text-lg">
                    {location?.region}, {location?.label}
                </h2>
                <p className="font-light text-neutral-500">
                    {reservationDate || data.category}
                </p>
                <div className="flex items-center gap-1">
                    <h4 className="font-semibold">$ {price}</h4>
                    {
                        !reservation && (<span className="font-light">night</span>)
                    }
                </div>
                {onAction && actionLabel && (
                    <Button disabled={disabled} small label={actionLabel} onClick={handleCancel} />
                )}
			</div>
		</div>
	);
};

export default ListingCard;
